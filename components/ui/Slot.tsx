/**
 * An image slot with no image behind it yet.
 *
 * Screenshots of the client sites are not on hand, and nothing is
 * substituted for them. The slot ships as the board's CSS treatment —
 * Paper White at Portal's image radius with the 1px Ash Mist ring —
 * and names what belongs there. Ash Mist would be invisible here, since
 * it is the page canvas. Every slot is listed in PLACEHOLDERS.md.
 */
export default function Slot({
  describes,
  ratio = 'square',
  className = '',
}: {
  describes: string
  ratio?: 'square' | 'video'
  className?: string
}) {
  const ratios = {
    square: 'aspect-square',
    video: 'aspect-video',
  }

  return (
    <div
      role="img"
      aria-label={describes}
      className={`flex flex-col justify-end overflow-hidden rounded-3xl-2 bg-paper-white p-20 shadow-subtle-4 ${ratios[ratio]} ${className}`}
    >
      <span className="font-inter text-caption leading-caption tracking-caption text-smoke">
        {describes}
      </span>
    </div>
  )
}
