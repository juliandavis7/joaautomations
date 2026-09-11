import Image from 'next/image'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

/**
 * The hero: Portal's one atmospheric surface, the lone-pine painting
 * edge to edge. Stars fill the strip between the wordmark and the
 * nav links, and stop above the title so the headline stays clear.
 *
 * Type sits directly on the sky, centered, in Paper White — the same
 * treatment as Portal's live homepage. No plate. The nav floats over
 * this section so the painting is full-bleed from the top of the
 * viewport. The CTA is Portal's white Hero Pill Button.
 *
 * The dissolve into Ash Mist copies Portal's Fade layer: a 240px
 * #f7f7f7 alpha strip, stretched (not cropped) so the full transparent-
 * to-opaque ramp survives, pinned bottom: -2px. --hero-hold keeps a
 * band of unfaded painting above that strip. Portal's Cover overscans
 * at 120% by 112%. The strip is a raw img — next/image's lossy pass
 * bands a soft alpha ramp.
 */
export default function Hero({
  heading,
  sub,
  cta,
}: {
  heading: string
  sub: string
  cta: { label: string; href: string }
}) {
  return (
    <section
      className="relative"
      style={{
        background: 'var(--gradient-dusk-gradient)',
        paddingTop: 'var(--hero-pad-top)',
        paddingBottom:
          'calc(var(--hero-hold) + var(--hero-fade-height) + var(--spacing-80))',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[-10%] top-0 h-[112%] w-[120%]">
          <Image
            src="/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_70%]"
          />
        </div>
        <div className="hero-stars">
          <img
            src="/hero-stars.svg?v=3"
            alt=""
            width={1440}
            height={180}
            className="absolute inset-x-0 top-0 h-full w-full object-cover object-top"
          />
          <span className="hero-star hero-star--a" />
          <span className="hero-star hero-star--b" />
          <span className="hero-star hero-star--c" />
        </div>
        <div
          className="absolute inset-x-0"
          style={{
            bottom: 'calc(-1 * var(--hero-fade-overlap))',
            height: 'var(--hero-fade-height)',
          }}
        >
          {/* Framer serves this fade unprocessed; do not run it through next/image. */}
          <img
            src="/hero-fade.webp"
            alt=""
            width={2000}
            height={276}
            className="h-full w-full object-fill"
          />
        </div>
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-reading text-center">
          <h1 className="m-0 font-perfectly-nineties-regular text-heading leading-heading font-normal text-paper-white lg:text-display lg:leading-display">
            {heading}
          </h1>
          <p className="mx-auto mb-24 mt-16 max-w-reading font-inter text-body leading-body tracking-body text-paper-white sm:mb-36 sm:mt-20">
            {sub}
          </p>
          <Button href={cta.href} variant="white">
            {cta.label}
            <svg
              viewBox="0 0 16 16"
              width={16}
              height={16}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-16 w-16 flex-none"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Button>
        </div>
      </Container>
    </section>
  )
}
