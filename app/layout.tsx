import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Catres Clínicos Chile - Venta de Camas Hospitalarias',
  description: 'Venta de catres clínicos y camas hospitalarias de alta calidad en Chile. Marca Stryker. Cotiza ahora.',
}

export const viewport: Viewport = {
  themeColor: '#1a6eb5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
