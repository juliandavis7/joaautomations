import { pitch } from '@/content/site'
import { Copy } from './FillIn'
import Reveal from './Reveal'

/** The page's one <h1>. It sits below the hero, not inside it. */
export default function Pitch() {
  return (
    <section className="shell section" aria-labelledby="pitch-heading">
      <div className="max-w-ct mx-auto pitch">
        <Reveal>
          <h1 id="pitch-heading" className="display measure">
            <Copy value={pitch.heading} />
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="body measure-body">
            <Copy value={pitch.body} />
          </p>
        </Reveal>
      </div>
    </section>
  )
}
