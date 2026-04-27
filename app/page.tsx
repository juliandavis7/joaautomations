import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import StatsSection from '@/components/StatsSection'
import BookingSection from '@/components/BookingSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <BookingSection />
      <Footer />
    </>
  )
}
