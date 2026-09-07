import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "رویداد ملی آینه",
  description: "مسیر تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره) به راهکارهای قابل اجرا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
