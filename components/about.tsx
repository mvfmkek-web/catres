import { Shield, Award, Truck, Wrench } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Marcas Premium Americanas",
    description: "Solo ofrecemos marcas premium americanas de alta calidad como Stryker, a los mejores precios del mercado.",
  },
  {
    icon: Shield,
    title: "Especialistas en Catres Clínicos",
    description: "Somos especialistas en venta y servicio técnico de catres clínicos en Chile.",
  },
  {
    icon: Truck,
    title: "Despacho a Todo Chile",
    description: "Realizamos despachos a todo Chile con embalaje seguro y transporte especializado.",
  },
  {
    icon: Wrench,
    title: "Garantía y Soporte Técnico",
    description: "Garantía incluida con soporte técnico. Ya no tendrá que preocuparse por repuestos ni servicio.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Sobre Nosotros
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {"¿Por qué elegirnos?"}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            {"Somos especialistas en venta y servicio técnico de catres clínicos en Chile. Solo ofrecemos marcas premium americanas de alta calidad, a los mejores precios del mercado."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-background p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
