export default function Bold({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} style={{ color: "var(--text)", fontWeight: 600 }}>{part.slice(2, -2)}</strong>
      : part
  )
}
