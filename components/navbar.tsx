"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, User } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-17%20at%2010.22.31%20PM-sivRwi6Sw2s5lsgBZ63vLxX4jFdDz7.jpeg"
            alt={"Logo Catres Clínicos Stryker"}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-contain bg-card"
          />
          <div>
            <span className="text-lg font-bold text-foreground">{"Catres Clínicos"}</span>
            <span className="block text-xs text-muted-foreground">Chile</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#inicio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Inicio
          </a>
          <a href="#productos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Productos
          </a>
          <a href="#cuidados" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Servicio de Cuidados
          </a>
          <a href="#nosotros" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Nosotros
          </a>
          <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contacto
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/56998587336?text=Hola%2C%20me%20interesa%20comprar..."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-[#fff] hover:bg-[#1ea952] transition-colors"
          >
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <User className="h-4 w-4" />
            Ingresar
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            <a href="#inicio" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Inicio
            </a>
            <a href="#productos" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Productos
            </a>
            <a href="#cuidados" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Servicio de Cuidados
            </a>
            <a href="#nosotros" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Nosotros
            </a>
            <a href="#contacto" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contacto
            </a>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <a
                href="https://wa.me/56998587336?text=Hola%2C%20me%20interesa%20comprar..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-[#fff]"
              >
                <Phone className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                <User className="h-4 w-4" />
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
