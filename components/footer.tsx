import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer id="contacto" className="bg-foreground py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-17%20at%2010.22.31%20PM-sivRwi6Sw2s5lsgBZ63vLxX4jFdDz7.jpeg"
                alt={"Logo Catres Clínicos Stryker"}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-contain bg-card"
              />
              <div>
                <span className="text-lg font-bold text-background">{"Catres Clínicos"}</span>
                <span className="block text-xs text-background/60">Chile</span>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              {"Venta y arriendo de catres clínicos Stryker. Servicio de cuidados con personal especializado."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-background mb-4">Contacto</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/56998587336?text=Hola%2C%20me%20interesa%20comprar..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
              >
                <Phone className="h-4 w-4" />
                +56 9 9858 7336
              </a>
              <a href="mailto:contacto@catres.cl" className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors">
                <Mail className="h-4 w-4" />
                contacto@catres.cl
              </a>
              <div className="flex items-center gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4" />
                Chile
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-background mb-4">Enlaces</h3>
            <div className="flex flex-col gap-2">
              <a href="#inicio" className="text-sm text-background/70 hover:text-background transition-colors">
                Inicio
              </a>
              <a href="#productos" className="text-sm text-background/70 hover:text-background transition-colors">
                Productos
              </a>
              <a href="#nosotros" className="text-sm text-background/70 hover:text-background transition-colors">
                Nosotros
              </a>
              <Link href="/login" className="text-sm text-background/70 hover:text-background transition-colors">
                Ingresar
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-background/10 pt-8 text-center">
          <p className="text-sm text-background/50">
            {"Catres Clínicos Chile. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
