import type { Metadata } from "next";
import { Inter_Tight, Sora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ClickPulse from "@/components/ClickPulse";
import { themeScript } from "@/components/ThemeToggle";
import { profile } from "@/data/content";

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-body" });
const sora = Sora({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: `${profile.name} | Portfolio`,
  description: `Portfolio of ${profile.name}, ${profile.program} student.`,
};

const words = profile.name.split(" ").filter(Boolean);
const shortName = words.length > 1 ? `${words[0]} ${words[words.length - 1]}` : profile.name;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Nav shortName={shortName} />
        <main>{children}</main>
        <ClickPulse />
        <footer className="site-footer">© 2026 {profile.name}</footer>
      </body>
    </html>
  );
}
