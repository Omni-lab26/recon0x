import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://recon0x.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050407" },
    { media: "(prefers-color-scheme: light)", color: "#F8F7FC" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "recon0x — 倫理的ハッキングを学ぶ",
    template: "%s · recon0x",
  },
  description:
    "実戦で使えるサイバーセキュリティのスキルを、ロードマップとハンズオンラボで体系的に学ぶ。",
  openGraph: {
    title: "recon0x",
    description: "倫理的ハッキングを学ぶ、日本語プラットフォーム。",
    url: siteUrl,
    siteName: "recon0x",
    locale: "ja_JP",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: replace mock user with Supabase session lookup once auth is wired in.
  const mockUser = null;

  return (
    <html lang="ja" className={`${inter.variable} ${mono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.17.0/tabler-icons.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add('theme-' + t);
                } catch (e) {
                  document.documentElement.classList.add('theme-dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <AppShell user={mockUser}>{children}</AppShell>
      </body>
    </html>
  );
}
