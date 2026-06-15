import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://recon0x.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/learn",
    "/articles",
    "/lab",
    "/ctf",
    "/community",
    "/leaderboard",
    "/tools",
    "/cve",
    "/news",
    "/glossary",
    "/login",
    "/signup",
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
