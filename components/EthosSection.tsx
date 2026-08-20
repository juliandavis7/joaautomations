'use client'

import { ethos } from '@/content/site'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import { Copy } from './FillIn'
import { openContactModal } from './ContactModal'

/** Two short paragraphs, first person. No credentials, no logo wall. */
export default function EthosSection() {
  return (
    <section id="ethos" className="shell section" aria-label="Ethos">
      <div className="max-w-ct mx-auto">
        <Eyebrow>Ethos</Eyebrow>
        <Reveal className="mt-[var(--sect-gap)] flex max-w-[46ch] flex-col gap-8">
          {ethos.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body">
              <Copy value={paragraph} />
            </p>
          ))}
        </Reveal>
        <Reveal delay={120}>
          <button type="button" className="ethos__cta" onClick={openContactModal}>
            Tell us what you&rsquo;re building
            <span className="arrow" aria-hidden="true">
              &#8599;
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
