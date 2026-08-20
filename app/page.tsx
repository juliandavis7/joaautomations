import ContactSection from '@/components/ContactForm'
import ContactModal from '@/components/ContactModal'
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
 *
 * The page runs three grounds rather than one: the dark hero, the paper
 * body, and a single dark block carrying Contact and the footer together.
 * The band under the hero dissolves the first join; the second is a hard
 * edge on purpose, because that is where the page changes what it is doing.
 */
export default function Home() {
  return (
    <>
      <NavBar overHero />
      <main id="top">
        <Hero />
        <Pitch />
        <WorkSection />
        <ServicesSection />
        <EthosSection />
        <div className="on-dark">
          <ContactSection />
        </div>
      </main>
      <div className="on-dark">
        <Footer />
      </div>
      <ContactModal />
    </>
  )
}
