import Image from 'next/image'
import BrandIcon from '@/components/ui/BrandIcon'
import Container from '@/components/ui/Container'

/**
 * Portal’s two-column closer: identity left, the same links as the
 * top nav stacked on the right. The landscape is cropped to the
 * ridge — the lower meadow is clipped — and scaled past the
 * viewport so the slopes reach the corners without showing the
 * source’s edges.
 */
export default function Footer({
  wordmark,
  locality,
  rights,
  links,
}: {
  wordmark: string
  locality: string
  rights: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <footer aria-label={wordmark}>
      <Container>
        <div className="mx-auto flex w-full max-w-feature flex-row items-start justify-between gap-40 pt-80 lg:pt-100">
          <div>
            <BrandIcon />
            <p className="m-0 mt-16 font-inter text-body leading-body tracking-body text-graphite">
              {locality}
            </p>
            <p className="mb-0 mt-40 font-inter text-caption leading-caption tracking-caption text-smoke lg:mt-60">
              &copy; {new Date().getFullYear()} {rights}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="m-0 flex list-none flex-col items-end p-0 text-right gap-12">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-inter text-body leading-body tracking-body font-normal text-ink-black no-underline transition-opacity duration-200 hover:opacity-60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      <div className="relative mt-16 aspect-[3/1] overflow-hidden lg:aspect-[5/1]">
        <Image
          src="/footer-landscape.png"
          alt=""
          fill
          sizes="100vw"
          className="origin-center object-cover object-[center_70%] scale-x-150"
        />
      </div>
    </footer>
  )
}
