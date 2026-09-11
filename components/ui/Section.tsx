/**
 * A page section on the Ash Mist canvas. Portal's section gap is
 * 80-120px; the board uses 80 at 375 and 100 on desktop, and stacks
 * sections so only the first carries top padding.
 */
export default function Section({
  id,
  children,
  labelledBy,
  label,
  topPadding = false,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  labelledBy?: string
  label?: string
  topPadding?: boolean
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`${topPadding ? 'pt-80 lg:pt-100' : ''} pb-80 lg:pb-100 ${className}`}
    >
      {children}
    </section>
  )
}
