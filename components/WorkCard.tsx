import type { WorkCardData } from '@/content/work'
import { Copy } from './FillIn'

/**
 * One card. Mobile and desktop are expressions of the same props — one
 * component tree, no second mobile DOM (docs/design-principles.md §6).
 *
 * Outcome headline (h2) -> client name (h3) -> story -> optional quote ->
 * <dl> of Services / Industry / Location -> ↗ when a URL exists.
 */
export default function WorkCard({ card }: { card: WorkCardData }) {
  return (
    <article className="work-card">
      <div className="work-card__main">
        <h2 className="display">
          <Copy value={card.headline} />
        </h2>
        <h3 className="mono work-card__client">{card.client}</h3>
        <p className="body work-card__story">
          <Copy value={card.story} />
        </p>

        {card.quote ? (
          <figure className="work-card__quote">
            <blockquote className="body">
              <p>&ldquo;{card.quote.text}&rdquo;</p>
            </blockquote>
            <figcaption className="mono">
              {card.quote.name}, {card.quote.title}
            </figcaption>
          </figure>
        ) : null}
      </div>

      <div className="work-card__aside">
        <dl className="cs-meta">
          <div className="cs-row">
            <dt className="mono">Services</dt>
            <dd className="mono">
              <Copy value={card.meta.services} />
            </dd>
          </div>
          <div className="cs-row">
            <dt className="mono">Industry</dt>
            <dd className="mono">
              <Copy value={card.meta.industry} />
            </dd>
          </div>
          <div className="cs-row">
            <dt className="mono">Location</dt>
            <dd className="mono">
              <Copy value={card.meta.location} />
            </dd>
          </div>
        </dl>

        {card.href ? (
          <a className="mono work-card__link" href={card.href} target="_blank" rel="noreferrer">
            See it live <span className="arrow" aria-hidden="true">&#8599;</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
