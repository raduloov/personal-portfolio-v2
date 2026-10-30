interface SparkProps {
  className?: string
}

/** Four-point star used as a separator in eyebrows and mono lines. */
export function Spark({ className = '' }: SparkProps) {
  return (
    <svg
      className={`spark ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 0c.6 7.2 4.8 11.4 12 12-7.2.6-11.4 4.8-12 12-.6-7.2-4.8-11.4-12-12 7.2-.6 11.4-4.8 12-12z" />
    </svg>
  )
}
