import { work } from '@/content/work'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import WorkCard from './WorkCard'

/** One section, three cards. Case studies and testimonials together. */
export default function WorkSection() {
  return (
    <section id="work" className="container section" aria-label="Work">
      <div className="max-w-ct mx-auto">
        <Eyebrow>Work</Eyebrow>
        <div className="mt-[var(--sect-gap)] flex flex-col gap-[var(--sect-gap)]">
          {work.map((card) => (
            <Reveal key={card.client}>
              <WorkCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
