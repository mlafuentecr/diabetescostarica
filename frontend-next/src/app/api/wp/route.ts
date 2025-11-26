import { NextResponse } from "next/server";

const WORDPRESS_API_BASE =
  process.env.WORDPRESS_REST_BASE || process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const normalizeBase = (base: string) => base.replace(/\/$/, "");

async function fetchFromWordPress<T>(path: string): Promise<T> {
  if (!WORDPRESS_API_BASE) {
    throw new Error("WordPress API base URL is not configured.");
  }

  const normalizedBase = normalizeBase(WORDPRESS_API_BASE);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${normalizedBase}${normalizedPath}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function GET() {
  try {
    const [posts, pages, frontPageList] = await Promise.all([
      fetchFromWordPress("/posts"),
      fetchFromWordPress("/pages"),
      fetchFromWordPress("/pages?slug=front-page"),
    ]);

    const frontPage = Array.isArray(frontPageList) ? frontPageList[0] ?? null : null;

    return NextResponse.json({ posts, pages, frontPage });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
