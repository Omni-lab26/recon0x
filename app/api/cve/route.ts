import { NextResponse } from "next/server";

export const revalidate = 300; // 5 minutes

interface NvdVuln {
  cve: {
    id: string;
    published: string;
    lastModified: string;
    descriptions: { lang: string; value: string }[];
    metrics?: {
      cvssMetricV31?: { cvssData: { baseScore: number; baseSeverity: string } }[];
      cvssMetricV30?: { cvssData: { baseScore: number; baseSeverity: string } }[];
    };
  };
}

// GET /api/cve  →  recent vulnerabilities from NVD
export async function GET() {
  try {
    // Last 30 days
    const now = new Date();
    const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fmt = (d: Date) =>
      d.toISOString().replace(/\.\d+Z$/, ".000");

    const url = `https://services.nvd.nist.gov/rest/json/cves/2.0?pubStartDate=${fmt(
      past
    )}&pubEndDate=${fmt(now)}&resultsPerPage=50`;

    const res = await fetch(url, {
      headers: { "user-agent": "recon0x/0.1 (https://recon0x.vercel.app)" },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json({ vulnerabilities: [] }, { status: 200 });
    }

    const data = (await res.json()) as { vulnerabilities?: NvdVuln[] };

    const items =
      data.vulnerabilities?.map((v) => {
        const metric =
          v.cve.metrics?.cvssMetricV31?.[0] ?? v.cve.metrics?.cvssMetricV30?.[0];
        return {
          id: v.cve.id,
          published: v.cve.published,
          modified: v.cve.lastModified,
          summary:
            v.cve.descriptions.find((d) => d.lang === "en")?.value ?? "",
          cvss: metric?.cvssData.baseScore ?? null,
          severity: metric?.cvssData.baseSeverity ?? null,
        };
      }) ?? [];

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
