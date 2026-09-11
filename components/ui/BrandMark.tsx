import Image from 'next/image'

/**
 * Carousel 40 (script JoJu) as the white tile alone — no blue app-icon
 * field. The png is the tile; it is not wrapped in a second box.
 *
 * The lockup text is just "Websites" — JoJu already lives in the mark.
 *
 * `tone="paper"` inverts the wordmark to Paper White for the dusk nav.
 * The tile stays paper.
 */
export default function BrandMark({
  label,
  tone = 'ink',
}: {
  label: string
  tone?: 'ink' | 'paper'
}) {
  const onPaper = tone === 'paper'
  return (
    <span className="flex items-center gap-8">
      <Image
        src="/joju-mark.png"
        alt="JoJu"
        width={36}
        height={36}
        className="h-36 w-36 flex-none rounded-[10px]"
      />
      <span
        className={`font-perfectly-nineties-regular text-[20px] leading-none font-normal whitespace-nowrap ${
          onPaper ? 'text-paper-white' : 'text-ink-black'
        }`}
      >
        {label}
      </span>
    </span>
  )
}
