import { work } from '@/content/work'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import WorkCard from './WorkCard'

/** One section, three cards. Case studies and testimonials together. */
export default function WorkSection() {
  return (
    <section id="work" className="shell section" aria-label="Work">
      <div className="max-w-ct mx-auto">
        <Eyebrow>Work</Eyebrow>
        <div className="work-list">
          {work.map((card, index) => (
            <Reveal key={card.client} delay={index * 60}>
              <WorkCard card={card} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
