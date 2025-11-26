import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Diabetes Costa Rica",
  description: "Aplicación Next.js con contenido de WordPress",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
