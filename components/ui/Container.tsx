/**
 * The page column. 1200 is Portal's documented frame; gutters open
 * from 20 at 375 to 40 on desktop so the canvas keeps a margin.
 */
export default function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-page px-20 sm:px-24 lg:px-40 ${className}`}>{children}</div>
  )
}
