/**
 * Atmosphere, not a headline. Full-bleed 100svh, pointer-events: none,
 * no text at all — the pitch and the page's one <h1> sit below it.
 *
 * Task A is the poster only. The poster is applied as the section's CSS
 * background (--hero-poster), which is also the fallback the Task B video
 * degrades to when autoplay is blocked or reduced motion is set.
 */
export default function Hero() {
  return <div className="hero" aria-hidden="true" />
}
