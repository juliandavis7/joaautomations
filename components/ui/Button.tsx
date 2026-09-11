/**
 * Every button is a 50px pill, per Portal. Two treatments actually
 * render on this page:
 *
 *  filled  Signal Blue with Portal's --shadow-subtle-5 lift. The
 *          committed action: nav CTA, send, visit the live site.
 *  white   Paper White on the gradient hero. Portal's Hero Pill Button;
 *          Ink Black text never sits directly on the gradient.
 *
 * Portal's Ghost Pill Button is not used anywhere in the v4 board's page
 * composition, so it is not carried here.
 *
 * Portal documents hover as an opacity shift rather than a second tone,
 * so no darker blue is introduced. min-h-45 holds every button at or
 * above the 44px tap target.
 */

type Variant = 'filled' | 'white'

const base =
  'inline-flex items-center justify-center gap-8 min-h-45 rounded-full font-inter leading-none no-underline transition duration-200'

const sizes = {
  md: 'px-24 py-14 text-body tracking-body font-semibold',
  sm: 'px-20 py-12 text-body-sm tracking-body-sm font-semibold',
}

const variants: Record<Variant, string> = {
  filled: 'bg-signal-blue text-paper-white shadow-subtle-5 hover:opacity-90 active:opacity-80',
  white: 'bg-paper-white text-ink-black hover:opacity-90 active:opacity-80',
}

type Props = {
  children: React.ReactNode
  variant?: Variant
  size?: 'md' | 'sm'
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  className?: string
  external?: boolean
}

export default function Button({
  children,
  variant = 'filled',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  external = false,
}: Props) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${
    disabled ? 'opacity-35 pointer-events-none' : ''
  } ${className}`

  if (href) {
    const rel = external ? 'noreferrer noopener' : undefined
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
