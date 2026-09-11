import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/motion/Reveal'

/**
 * Services as Portal feature rows: three chapters, claim + list on one
 * side, a paper object on the other, sides flipping. The locked treatment
 * is "Page and phone" from the Option B carousel — overlapping desktop
 * and phone cards on the first row, a search listing on the second, an
 * email thread on the third.
 *
 * There is no section title. The three claims do the rest. The
 * section is named for assistive tech so the nav still maps.
 */

/**
 * One line icon per service, drawn on the same 24 grid at stroke 1.5 so
 * the six marks read as one set. Ordered to match the chapters and their
 * items in lib/copy.ts; the colored dots they replace are gone.
 */
const paths = {
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2.5" />
      <path d="M9 20.5h6M12 17v3.5" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16A5 5 0 0 0 21 10c0-3.9-4-7-9-7Z" />
      <circle cx="8" cy="11.5" r="1" />
      <circle cx="11.5" cy="7.5" r="1" />
      <circle cx="15.5" cy="9.5" r="1" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </>
  ),
  copy: <path d="M4 6h16M4 11h16M4 16h11M4 21h7" />,
  support: (
    <>
      <path d="M21 12a9 9 0 1 1-3.6-7.2" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
} as const

const icons = [
  ['monitor', 'phone', 'brand'],
  ['pin', 'copy'],
  ['support'],
] as const satisfies readonly (readonly (keyof typeof paths)[])[]

function ServiceIcon({ name }: { name: keyof typeof paths }) {
  return (
    <span
      className="grid h-[32px] w-[32px] flex-none place-items-center rounded-[10px] bg-ash-mist text-graphite shadow-subtle-4"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="block h-16 w-16"
      >
        {paths[name]}
      </svg>
    </span>
  )
}

type Item = { name: string; description: string }

function PagePhone({
  url,
  name,
  sub,
  phoneSub,
  cta,
  hours,
}: {
  url: string
  name: string
  sub: string
  phoneSub: string
  cta: string
  hours: string
}) {
  return (
    <div className="relative pr-24 pb-24">
      <div className="m-5 overflow-hidden rounded-3xl bg-paper-white shadow-subtle">
        <div className="flex items-center gap-6 border-b border-ash-mist px-16 py-14">
          <span className="h-8 w-8 rounded-full bg-ash-mist" />
          <span className="h-8 w-8 rounded-full bg-ash-mist" />
          <span className="h-8 w-8 rounded-full bg-ash-mist" />
          <span className="ml-6 flex-1 rounded-full bg-ash-mist px-10 py-4 font-inter text-caption leading-caption tracking-caption text-smoke">
            {url}
          </span>
        </div>
        <div className="px-20 pb-20 pt-16">
          <p className="m-0 font-inter text-heading-sm leading-heading-sm tracking-heading-sm font-medium text-ink-black">
            {name}
          </p>
          <p className="m-0 mt-6 font-inter text-caption leading-caption text-smoke">{sub}</p>
          <span className="mt-14 inline-block rounded-full bg-signal-blue px-16 py-8 font-inter text-caption leading-caption font-medium text-paper-white">
            {cta}
          </span>
          <div className="mt-16 grid grid-cols-2 gap-8">
            <span
              className="h-60 rounded-2xl"
              style={{ background: 'var(--gradient-brand-mark)' }}
            />
            <span
              className="h-60 rounded-2xl"
              style={{
                background:
                  'linear-gradient(180deg, var(--color-dusk-rose) 0%, var(--color-dusk-coral) 100%)',
              }}
            />
          </div>
          <p className="mb-0 mt-14 font-inter text-caption leading-caption text-smoke">{hours}</p>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-[132px] overflow-hidden rounded-2xl-2 bg-paper-white shadow-subtle">
        <div className="grid h-24 place-items-center">
          <span className="h-5 w-45 rounded-full bg-ash-mist" />
        </div>
        <div className="px-10 pb-12 pt-4">
          <p className="m-0 font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-ink-black">
            {name}
          </p>
          <p className="m-0 mt-4 font-inter text-micro leading-micro text-smoke">{phoneSub}</p>
          <span className="mt-10 inline-block rounded-full bg-signal-blue px-10 py-5 font-inter text-micro leading-micro font-medium text-paper-white">
            {cta}
          </span>
        </div>
      </div>
    </div>
  )
}

function SearchCard({
  query,
  you,
  other,
}: {
  query: string
  you: { name: string; meta: string }
  other: { name: string; meta: string }
}) {
  return (
    <div className="m-5 flex flex-col gap-12 rounded-3xl bg-paper-white p-20 shadow-subtle">
      <div className="flex items-center gap-8 rounded-full bg-ash-mist px-14 py-10 font-inter text-body-sm leading-body-sm tracking-body-sm text-smoke">
        <svg
          viewBox="0 0 18 18"
          width={14}
          height={14}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="h-14 w-14 flex-none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="5" />
          <path d="m12 12 3.5 3.5" />
        </svg>
        <span>{query}</span>
      </div>
      <div className="rounded-2xl px-14 py-12 shadow-subtle-4">
        <strong className="block font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-signal-blue">
          {you.name}
        </strong>
        <span className="mt-4 block font-inter text-caption leading-caption text-smoke">{you.meta}</span>
      </div>
      <div className="rounded-2xl px-14 py-12 shadow-subtle-4">
        <strong className="block font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-smoke">
          {other.name}
        </strong>
        <span className="mt-4 block font-inter text-caption leading-caption text-smoke">
          {other.meta}
        </span>
      </div>
    </div>
  )
}

function MailCard({
  inbound,
  reply,
  stamp,
}: {
  inbound: string
  reply: string
  stamp: string
}) {
  return (
    <div className="m-5 flex flex-col gap-12 rounded-3xl bg-paper-white p-20 shadow-subtle">
      <p className="m-0 max-w-[82%] self-end rounded-[18px] bg-signal-blue px-14 py-10 font-inter text-body-sm leading-body-sm tracking-body-sm text-paper-white">
        {inbound}
      </p>
      <p className="m-0 max-w-[82%] self-start rounded-[18px] bg-ash-mist px-14 py-10 font-inter text-body-sm leading-body-sm tracking-body-sm text-graphite">
        {reply}
      </p>
      <p className="m-0 text-right font-inter text-caption leading-caption text-smoke">{stamp}</p>
    </div>
  )
}

export default function Services({
  chapters,
  page,
  search,
  mail,
}: {
  chapters: readonly { claim: string; items: readonly Item[] }[]
  page: {
    url: string
    name: string
    sub: string
    phoneSub: string
    cta: string
    hours: string
  }
  search: {
    query: string
    you: { name: string; meta: string }
    other: { name: string; meta: string }
  }
  mail: { inbound: string; reply: string; stamp: string }
}) {
  const visuals = [
    <PagePhone key="page" {...page} />,
    <SearchCard key="search" {...search} />,
    <MailCard key="mail" {...mail} />,
  ]

  return (
    <Section id="services" label="Services" topPadding>
      <Container>
        <div className="mx-auto flex w-full max-w-feature flex-col gap-80 md:gap-100">
          {chapters.map((chapter, i) => (
            <Reveal key={chapter.claim} delay={i * 0.05}>
              <div className="grid grid-cols-1 items-center gap-24 md:grid-cols-2 md:gap-60">
                <div className={i % 2 === 0 ? 'md:order-2' : undefined}>
                  <h2 className="m-0 font-perfectly-nineties-regular text-heading leading-heading font-normal text-ink-black">
                    {chapter.claim}
                  </h2>
                  <ul className="m-0 mt-24 flex list-none flex-col border-t border-ash-mist p-0">
                    {chapter.items.map((item, j) => (
                      <li
                        key={item.name}
                        className="flex items-center gap-12 border-b border-ash-mist py-14"
                      >
                        <ServiceIcon name={icons[i][j]} />
                        <div>
                          <p className="m-0 font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-ink-black">
                            {item.name}
                          </p>
                          <p className="m-0 mt-4 font-inter text-caption leading-caption tracking-caption text-smoke">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={i % 2 === 0 ? 'md:order-1' : undefined}
                  aria-hidden="true"
                >
                  {visuals[i]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
