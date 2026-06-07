import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Listing Shield",
  description: "Google Maps listing audit and brand protection dashboard."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
