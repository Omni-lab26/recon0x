import { NextResponse } from "next/server";

export const revalidate = 300;

// GET /api/feed → CISA / The Hacker News etc. (RSS) — placeholder
// TODO: parse multiple RSS feeds and unify into a single timeline.
export async function GET() {
  return NextResponse.json({
    items: [],
    note: "News feed is coming soon. RSS parsing not implemented yet.",
  });
}
