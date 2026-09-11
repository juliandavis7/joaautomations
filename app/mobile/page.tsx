import Container from '@/components/ui/Container'

/**
 * Mobile preview harness. Renders /web inside a 375px frame so the
 * mobile breakpoint can be checked on a desktop browser. Dev only — see
 * the note in app/page.tsx.
 */
export default function MobilePreview() {
  return (
    <main id="main" className="py-40">
      <Container>
        <div className="mb-24 flex items-center justify-between gap-16">
          <p className="m-0 font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-smoke">
            Mobile preview at 375px
          </p>
          <a
            href="/"
            className="font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-signal-blue"
          >
            Back
          </a>
        </div>
        <div className="flex justify-center">
          <iframe
            src="/web"
            title="JoJu Websites at 375px"
            width={375}
            height={812}
            className="rounded-3xl-2 bg-paper-white shadow-subtle"
          />
        </div>
      </Container>
    </main>
  )
}
