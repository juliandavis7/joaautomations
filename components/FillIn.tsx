/**
 * Renders copy that may still be a literal [FILL IN: …] marker. Markers
 * are meant to be visible in the running site — an empty marker is
 * correct, a plausible invention is not (docs/brief.md).
 */
export function isMarker(value: string) {
  return value.startsWith('[FILL IN')
}

export function Copy({ value }: { value: string }) {
  if (!isMarker(value)) return <>{value}</>
  return <span className="fillin">{value}</span>
}
