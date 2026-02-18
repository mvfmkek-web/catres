import { Heart, Clock, Users, BedDouble } from "lucide-react"

const services = [
  {
    icon: Clock,
    title: "Atención Flexible",
    description: "Por horas, días o de forma permanente, adaptada a cada necesidad.",
  },
  {
    icon: Users,
    title: "Personal Especializado",
    description: "Cuidadoras capacitadas en salud, movilidad, higiene y compañía emocional.",
  },
  {
    icon: Heart,
    title: "Atención Continua",
    description: "Si la cuidadora asignada no pudiera concurrir, sería reemplazada por otra para cubrir los turnos.",
  },
  {
    icon: BedDouble,
    title: "Cama Clínica Gratis",
    description: "Prestación de cama clínica gratis hasta por 3 meses al contratar el servicio.",
  },
]

export function Cuidados() {
  return (
    <section id="cuidados" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent mb-4">
            Nuevo Servicio
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Servicio de Cuidadoras
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            {"Se brinda atención adaptada a cada necesidad, por horas, días o de forma permanente, con personal especializado, entregando cuidado de salud, apoyo en movilidad, higiene y compañía emocional. Asegurando una atención continua, ya que si por fuerza mayor la cuidadora asignada no pudiera concurrir, sería reemplazada por otra para cubrir dichos turnos."}
          </p>
          <p className="mt-3 max-w-3xl mx-auto font-semibold text-foreground leading-relaxed">
            {"Valores convenientes y prestación de cama clínica gratis hasta por 3 meses."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15">
                <service.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://wa.me/56998587336?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20cuidados..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {"Más Información"}
          </a>
        </div>
      </div>
    </section>
  )
}
