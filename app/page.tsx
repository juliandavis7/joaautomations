import ContactForm from '@/components/ContactForm'
import EthosSection from '@/components/EthosSection'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import NavBar from '@/components/NavBar'
import Pitch from '@/components/Pitch'
import ServicesSection from '@/components/ServicesSection'
import WorkSection from '@/components/WorkSection'

/**
 * Nav -> hero (no text) -> pitch/<h1> -> Work (3 cards) -> Services ->
 * Ethos -> Contact -> Footer. Locked in docs/migration-plan.md §0.
 */
export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top">
        <Hero />
        <Pitch />
        <WorkSection />
        <ServicesSection />
        <EthosSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
