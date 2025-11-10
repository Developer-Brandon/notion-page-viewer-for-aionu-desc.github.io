"use client";

import { useEffect } from "react";

export default function Home() {
  const pageId = "2a4378a5f80180d09fc8df0721758f5a";
  const notionUrl = `https://www.notion.so/${pageId}`;

  useEffect(() => {
    // 로드 후 2초 뒤 리다이렉트
    const timer = setTimeout(() => {
      window.location.href = notionUrl;
    }, 2000);

    return () => clearTimeout(timer);
  }, [notionUrl]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700 mb-4">Notion 페이지로 이동 중입니다...</p>
        <p className="text-sm text-gray-600">
          자동으로 이동되지 않으면{" "}
          <a
            href={notionUrl}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            여기를 클릭하세요
          </a>
        </p>
      </div>
    </div>
  );
}
