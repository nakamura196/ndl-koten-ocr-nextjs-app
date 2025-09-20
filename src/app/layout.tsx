import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDL古典籍OCR',
  description: '国立国会図書館の古典籍OCRシステム',
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