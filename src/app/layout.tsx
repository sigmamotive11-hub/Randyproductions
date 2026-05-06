import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Randyproductions — Premium Beats & Loop Kits",
  description: "High-quality beats and loop kits for the next generation of Drill, dark trap, and afrobeat. By Randyy.",
  keywords: ["beats", "drill beats", "trap beats", "loop kits", "prod randyy", "randyproductions"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎵</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ overflowY: 'scroll' }}>
      <body className={`${outfit.variable} antialiased`} style={{ fontFamily: "'Outfit', sans-serif" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
