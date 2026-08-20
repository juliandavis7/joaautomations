import type { WorkCardData } from '@/content/work'
import { Copy } from './FillIn'

/**
 * One card. Mobile and desktop are expressions of the same props — one
 * component tree, no second mobile DOM (docs/design-principles.md §6).
 *
 * The plate on the left is the ramp made visible: one colour per card,
 * descending the page as you read down it. That is a system, which
 * docs/design-principles.md §3 allows, rather than decoration. It carries
 * the index and the client name so it is a real object, and it invents no
 * imagery we do not have.
 *
 * Text side: outcome headline (h2) -> client name (h3) -> story -> optional
 * quote -> <dl> of Services / Industry / Location -> ↗ when a URL exists.
 */
export default function WorkCard({ card, index }: { card: WorkCardData; index: number }) {
  return (
    <article
      className="work-card"
      style={{ ['--plate' as string]: `var(--ramp-${index + 1})` }}
    >
      <div className="work-card__plate" aria-hidden="true">
        <span className="work-card__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="work-card__plate-name">{card.client}</span>
      </div>

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
          <a className="work-card__link" href={card.href} target="_blank" rel="noreferrer">
            See it live{' '}
            <span className="arrow" aria-hidden="true">
              &#8599;
            </span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
