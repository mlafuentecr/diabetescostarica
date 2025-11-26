export type WordPressRenderable = {
  id: number
  slug: string
  title?: { rendered?: string }
  content?: { rendered?: string }
}

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, "")

const WORDPRESS_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    process.env.WORDPRESS_URL ||
    "http://localhost:8000"
)

const apiBase = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, { cache: "no-store" })

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function fetchPageBySlug(slug: string): Promise<WordPressRenderable | null> {
  const pages = await fetchJson<WordPressRenderable[]>(`/pages?slug=${slug}`)
  return pages[0] ?? null
}

export async function fetchFirstPage(): Promise<WordPressRenderable | null> {
  const pages = await fetchJson<WordPressRenderable[]>(`/pages?per_page=1`)
  return pages[0] ?? null
}

export async function fetchLatestPost(): Promise<WordPressRenderable | null> {
  const posts = await fetchJson<WordPressRenderable[]>(`/posts?per_page=1`)
  return posts[0] ?? null
}

export async function getFrontPageContent(): Promise<WordPressRenderable | null> {
  try {
    const preferredPage =
      (await fetchPageBySlug("home")) || (await fetchFirstPage()) || (await fetchLatestPost())

    return preferredPage ?? null
  } catch (error) {
    console.error("Error fetching WordPress content", error)
    return null
  }
}

export function getWordPressBaseUrl() {
  return WORDPRESS_BASE_URL
}
