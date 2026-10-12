import { useEffect, useState } from "react"

// Types out text (with **bold** markers) over `ms` milliseconds, very fast
export default function TypeText({ text, ms = 300 }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map(p =>
    p.startsWith("**") ? { t: p.slice(2, -2), bold: true } : { t: p, bold: false }
  )
  const total = parts.reduce((n, p) => n + p.t.length, 0)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = now => {
      const k = Math.min(total, Math.ceil(((now - start) / ms) * total))
      setShown(k)
      if (k < total) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, total, ms])

  let left = shown
  return parts.map((p, i) => {
    const slice = p.t.slice(0, Math.max(0, left))
    left -= p.t.length
    return p.bold
      ? <strong key={i} style={{ color: "var(--text)", fontWeight: 600 }}>{slice}</strong>
      : slice
  })
}
