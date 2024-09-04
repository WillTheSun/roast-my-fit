import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-montserrat',
});

const roboto = Roboto({ 
  weight: ["400", "700"], 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Roast My Fit",
  description: "Get your outfit roasted by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="font-roboto">{children}</body>
    </html>
  );
}
