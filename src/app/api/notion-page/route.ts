import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");

    if (!pageId) {
      return NextResponse.json({ error: "pageId 필수" }, { status: 400 });
    }

    const notionUrl = `https://www.notion.so/${pageId}?pvs=4`;

    const response = await fetch(notionUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Notion 페이지를 불러올 수 없습니다: ${response.statusText}`
      );
    }

    const html = await response.text();

    // Cheerio로 HTML 파싱
    const $ = cheerio.load(html);

    // 모든 href 속성 수정
    $("[href]").each((_, elem) => {
      const href = $(elem).attr("href");
      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("data:") &&
        !href.startsWith("#")
      ) {
        const fullUrl = href.startsWith("/")
          ? `https://www.notion.so${href}`
          : `https://www.notion.so/${href}`;
        $(elem).attr("href", fullUrl);
      }
    });

    // 모든 src 속성 수정
    $("[src]").each((_, elem) => {
      const src = $(elem).attr("src");
      if (
        src &&
        !src.startsWith("http") &&
        !src.startsWith("data:") &&
        !src.startsWith("#")
      ) {
        const fullUrl = src.startsWith("/")
          ? `https://www.notion.so${src}`
          : `https://www.notion.so/${src}`;
        $(elem).attr("src", fullUrl);
      }
    });

    // 불필요한 스크립트 제거
    $("script").remove();

    // 수정된 HTML 반환
    const modifiedHtml = $.html();

    return new Response(modifiedHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "페이지 로드 실패" },
      { status: 500 }
    );
  }
}
