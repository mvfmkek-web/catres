"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/56998587336?text=Hola%2C%20me%20interesa%20comprar..."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#fff] shadow-lg hover:bg-[#1ea952] transition-all hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
