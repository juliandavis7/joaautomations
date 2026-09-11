import Container from '@/components/ui/Container'
import BrandMark from '@/components/ui/BrandMark'
import { site } from '@/lib/copy'

/**
 * Local preview index.
 *
 * A dev convenience, not part of the site: two links into the same
 * responsive page, one at full width and one inside a 375px frame, so
 * both breakpoints can be checked without opening devtools.
 *
 * The production page is /web. To ship, make /web the root and delete
 * this file along with app/mobile.
 */
export default function PreviewIndex() {
  const links = [
    {
      href: '/web',
      label: 'Web version',
      note: 'The full page at the width of your browser window.',
    },
    {
      href: '/mobile',
      label: 'Mobile version',
      note: 'The same page inside a 375px frame.',
    },
  ]

  return (
    <main id="main" className="flex min-h-screen items-center py-60">
      <Container>
        <div className="max-w-reading">
          <BrandMark label={site.lockup} />
          <h1 className="mb-40 mt-24 font-perfectly-nineties-regular text-heading leading-heading font-normal text-ink-black">
            Local preview
          </h1>
          <ul className="m-0 flex list-none flex-col gap-20 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex items-center justify-between gap-24 rounded-3xl bg-paper-white p-24 no-underline shadow-subtle"
                >
                  <span className="block">
                    <span className="block font-inter text-heading-sm leading-heading-sm tracking-heading-sm font-semibold text-ink-black">
                      {l.label}
                    </span>
                    <span className="mt-6 block font-inter text-body-sm leading-body-sm tracking-body-sm text-smoke">
                      {l.note}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-45 w-45 flex-none items-center justify-center rounded-full bg-ash-mist text-ink-black transition duration-200 group-hover:bg-signal-blue group-hover:text-paper-white"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      width={16}
                      height={16}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-16 w-16"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  )
}
