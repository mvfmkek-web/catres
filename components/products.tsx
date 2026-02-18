"use client"

import Image from "next/image"
import { Phone, Check } from "lucide-react"
import { useState } from "react"

const WHATSAPP_URL = "https://wa.me/56998587336?text=Hola%2C%20me%20interesa%20comprar..."

export function Products() {
  const [quoteSent, setQuoteSent] = useState(false)

  const handleQuote = async () => {
    try {
      const sessionRes = await fetch("/api/clients/session")
      const sessionData = await sessionRes.json()

      if (sessionData.authenticated) {
        const res = await fetch("/api/quotations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName: "Catre Clínico Stryker",
            message: "Cotización solicitada para Catre Clínico Stryker",
          }),
        })
        if (res.ok) {
          setQuoteSent(true)
          setTimeout(() => setQuoteSent(false), 3000)
        }
      }
    } catch {
      // silently continue to WhatsApp
    }

    window.open(WHATSAPP_URL, "_blank")
  }

  return (
    <section id="productos" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Nuestro Producto
          </span>

          {/* Foto profesional del Stryker */}
          <div className="relative mx-auto mb-8 aspect-video w-full max-w-3xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-17%20at%2011.35.14%20PM-ngOpqn9RQdTu5tfrh7aesrFenskvqi.jpeg"
              alt={"Catre Clínico Stryker - Vista profesional"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 768px"
              priority
            />
          </div>

          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {"Catre Clínico Stryker"}
          </h2>
          <p className="mt-2 inline-block rounded-full bg-primary px-5 py-1.5 text-sm font-bold text-primary-foreground uppercase tracking-wider">
            {"Despacho a todo Chile"}
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            {"Stryker, una marca premium americana para el paciente a su alcance, reacondicionados, con estricto control de calidad para su entrega."}
          </p>
        </div>

        {/* Main product card */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div>
            {/* Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">Marca Premium Americana</p>
                <h3 className="text-2xl font-bold text-foreground">{"Catre Clínico Stryker"}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {"Ya no tendrá que adquirir camas chinas, sin servicio ni repuestos. Nuestras camas se entregan con garantía y soporte técnico."}
                </p>

                <p className="mt-3 text-xs italic text-muted-foreground">
                  Foto referencial, valor no incluye los opcionales.
                </p>

                {/* Features */}
                <div className="mt-5 flex flex-col gap-2">
                  <h4 className="text-sm font-semibold text-foreground">{"Características:"}</h4>
                  {[
                    "5 posiciones - regula altura de somier, respaldo, piernas y más",
                    "Dual: funciona en forma eléctrica y manual en caso de falta de electricidad",
                    "4 barandillas ergonómicas redondeadas",
                    "Sistema de frenos",
                    "5 paneles de control, incluidas ambas barandas",
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-6">
                {/* Se aceptan tarjetas - destacado */}
                <div className="flex items-center justify-center gap-3 rounded-lg bg-[#1a1a2e] py-2.5 px-4 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/66458db15e2bfb1d9527020b-credit-card-logo-decal-sticker-visa-Oo2MuXOGi4ilwhVhmN7sdgvhXutJpz.webp"
                    alt="Visa y MasterCard"
                    width={50}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                  <span className="text-sm font-bold text-[#fff]">{"¡Se aceptan tarjetas de crédito y débito!"}</span>
                </div>

                <div className="rounded-xl bg-secondary p-4 mt-2">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Venta:</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-foreground">$498.000</span>
                        <p className="text-xs text-muted-foreground">(IVA incluido)</p>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Arriendo mensual:</span>
                      <span className="text-2xl font-bold text-foreground">$45.000</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-center text-lg font-extrabold text-foreground uppercase tracking-wide md:text-xl">
                  {"Descuento en Efectivo"}
                </p>

                {/* Destacado: Consulte disponibilidad */}
                <p className="mt-2 text-center text-sm font-semibold text-primary">
                  {"Consulte disponibilidad de modelos más económicos"}
                </p>

                <button
                  onClick={handleQuote}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3.5 text-sm font-bold text-[#fff] hover:bg-[#1ea952] transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  {quoteSent ? "Consulta Enviada" : "Más Información"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Arriendo section */}
        <div className="mx-auto max-w-4xl mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground">Servicio de arriendo</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {"Camas clínicas eléctricas americanas. Valor arriendo mensual "}
                <strong className="text-foreground">$45.000</strong>.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 shrink-0 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-bold text-[#fff] hover:bg-[#1ea952] transition-colors"
            >
              <Phone className="h-4 w-4" />
              {"Más Información"}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
