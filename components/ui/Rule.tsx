import Container from '@/components/ui/Container'

/**
 * A stippled hairline on the Ash Mist canvas. Portal's documented
 * hairlines (#ffffff, #f7f7f7) disappear here, so the dots mix Smoke
 * — already the muted-type color — instead of introducing a new gray.
 */
export default function Rule() {
  return (
    <Container>
      <hr
        aria-hidden="true"
        className="mx-auto m-0 h-px w-full max-w-feature border-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, color-mix(in srgb, var(--color-smoke) 40%, transparent) 0 1px, transparent 1px 3px)',
        }}
      />
    </Container>
  )
}
