import Link from "next/link"
import { getFrontPageContent, getWordPressBaseUrl } from "@/src/lib/wp/client"

export default async function Home() {
  const wpContent = await getFrontPageContent()
  const wpUrl = getWordPressBaseUrl()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 md:px-12 lg:px-16">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contenido de WordPress</p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Inicio desde el backend de WordPress</h1>
          <p className="max-w-3xl text-base text-slate-600">
            El inicio de Next.js ahora carga el contenido publicado en tu sitio de WordPress.
            Ajusta la variable de entorno <code className="rounded bg-slate-200 px-1 py-0.5 text-xs">NEXT_PUBLIC_WORDPRESS_URL</code>
            para apuntar al servidor correcto (por defecto <span className="font-medium">{wpUrl}</span>).
          </p>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          {wpContent ? (
            <article className="prose max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-indigo-600 hover:prose-a:text-indigo-700">
              <h2 className="mb-2 text-2xl font-semibold" dangerouslySetInnerHTML={{ __html: wpContent.title?.rendered || "Inicio" }} />
              <div dangerouslySetInnerHTML={{ __html: wpContent.content?.rendered || "" }} />
            </article>
          ) : (
            <div className="flex flex-col gap-4 text-slate-700">
              <p className="text-base">
                No se pudo recuperar contenido de WordPress. Verifica que el backend esté disponible y que existan páginas o
                entradas publicadas.
              </p>
              <Link
                href="/"
                className="w-fit rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
              >
                Reintentar
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
