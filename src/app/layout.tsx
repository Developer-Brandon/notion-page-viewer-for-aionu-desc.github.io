import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notion Page Viewer",
  description: "Notion page embedded viewer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
