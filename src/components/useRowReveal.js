import { useEffect, useRef, useState } from "react"

// Scroll-reveal for a row of cards: they slide in from the left, one after another, left to right
export function useRowReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, shown }
}

// Style pieces a card merges in: starting state, end state, and the transitions (staggered by position)
export function revealStyle(shown, index, step = 0.12) {
  const d = index * step
  return {
    style: { opacity: shown ? 1 : 0, transform: shown ? "none" : "translateX(-56px)" },
    transition: `opacity 0.7s ease ${d}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  }
}
