import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { Cuidados } from "@/components/cuidados"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { WhatsAppFab } from "@/components/whatsapp-fab"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Cuidados />
        <About />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
