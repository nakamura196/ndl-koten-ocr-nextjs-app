import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDL古典籍OCR Lite Web版 Next.js利用デモ',
  description: 'NDL古典籍OCR Liteのブラウザ版をNext.jsで実装したデモアプリケーション',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}