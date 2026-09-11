import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import Rule from '@/components/ui/Rule'
import { about, footer, hero, nav, services, site } from '@/lib/copy'
import { portfolio } from '@/lib/portfolio'

/**
 * The page. Section order matches the nav: About, Work, Services,
 * Contact. Every string arrives from lib/copy.ts or lib/portfolio.ts.
 */
export default function Page() {
  return (
    <div id="top" className="relative">
      <Nav />
      <main id="main">
        <Hero heading={hero.heading} sub={hero.sub} cta={hero.cta} />
        <About
          heading={about.heading}
          body={about.body}
          founders={about.founders}
        />
        <Rule />
        <Work entries={portfolio} />
        <Rule />
        <Services
          chapters={services.chapters}
          page={services.page}
          search={services.search}
          mail={services.mail}
        />
        <Rule />
        <Contact />
        <Rule />
      </main>
      <Footer
        wordmark={site.wordmark}
        locality={footer.locality}
        rights={footer.rights}
        links={nav.links}
      />
    </div>
  )
}
