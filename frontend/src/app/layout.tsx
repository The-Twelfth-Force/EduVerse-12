import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eLearning 2.0",
  description: "Improved eLearning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
