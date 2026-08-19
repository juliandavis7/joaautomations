/**
 * The one repeated ornament. Every section opens with this object, which
 * is what makes otherwise-plain sections read as a set. The ornament
 * itself is per-direction: A a ruled line, B brackets, C a pill — all
 * three styled from `.eyebrow__*` in globals.css, never from here.
 */
export default function Eyebrow({ children }: { children: string }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow__bracket" aria-hidden="true">
        [
      </span>
      <span>{children}</span>
      <span className="eyebrow__bracket" aria-hidden="true">
        ]
      </span>
      <span className="eyebrow__ornament" aria-hidden="true" />
    </p>
  )
}
