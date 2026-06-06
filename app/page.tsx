import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Problems } from "@/components/landing/problems"
import { Services } from "@/components/landing/services"
import { BeforeAfter } from "@/components/landing/before-after"
import { Results } from "@/components/landing/results"
import { Examples } from "@/components/landing/examples"
import { Process } from "@/components/landing/process"
import { Trust } from "@/components/landing/trust"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main id="top" className="premium-bg-system relative min-h-screen overflow-x-clip">
      <Header />
      <Hero />
      <Problems />
      <Services />
      <BeforeAfter />
      <Results />
      <Examples />
      <Process />
      <Trust />
      <CTA />
      <Footer />
    </main>
  )
}
