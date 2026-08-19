import { pitch } from '@/content/site'
import { Copy } from './FillIn'

/** The page's one <h1>. It sits below the hero, not inside it. */
export default function Pitch() {
  return (
    <section className="container section" aria-labelledby="pitch-heading">
      <div className="max-w-ct mx-auto">
        <h1 id="pitch-heading" className="display measure">
          <Copy value={pitch.heading} />
        </h1>
        <p className="body measure-body mt-[var(--sect-gap)]">
          <Copy value={pitch.body} />
        </p>
      </div>
    </section>
  )
}
