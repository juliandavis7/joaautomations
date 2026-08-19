import { ethos } from '@/content/site'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import { Copy } from './FillIn'

/** Two short paragraphs, first person. No credentials, no logo wall. */
export default function EthosSection() {
  return (
    <section id="ethos" className="container section" aria-label="Ethos">
      <div className="max-w-ct mx-auto">
        <Eyebrow>Ethos</Eyebrow>
        <Reveal className="mt-[var(--sect-gap)] flex max-w-[46ch] flex-col gap-8">
          {ethos.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body">
              <Copy value={paragraph} />
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
