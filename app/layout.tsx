import type { Metadata } from "next";
import { Exo_2, Poppins } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NiTRO Energy Drink",
  description:
    "NiTRO Energy Drink - High intensity energy since 2002. Zero sugar flavour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${poppins.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
