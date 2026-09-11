/**
 * A labelled form control. Real <label for>, real inline error wired
 * through aria-describedby and aria-invalid.
 *
 * Portal gives no outline value that is visible on a Paper White card
 * (its hairline role is #ffffff and its 1px ring is #f7f7f7), so the
 * field reads through an Ash Mist fill instead — the same subtle
 * #f7f7f7 treatment Portal documents on its neutral Status Badge.
 * A failed field gets Portal's 1.5px Ink outline (the Ghost Pill
 * weight) so the error is on the control, not a new color.
 */
export default function Field({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  defaultValue,
  textarea = false,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  defaultValue?: string
  textarea?: boolean
}) {
  const errorId = `${id}-error`
  const shared = `w-full bg-ash-mist text-graphite rounded-2xl px-16 py-14 font-inter text-body leading-body tracking-body border-[1.5px] placeholder:text-smoke ${
    error ? 'border-ink-black' : 'border-transparent'
  }`

  return (
    <div className="flex flex-col gap-8">
      <label
        htmlFor={id}
        className="font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-ink-black"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          defaultValue={defaultValue}
          className={`${shared} min-h-100 resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          defaultValue={defaultValue}
          className={shared}
        />
      )}

      {error ? (
        <p
          id={errorId}
          className="font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-ink-black"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}
