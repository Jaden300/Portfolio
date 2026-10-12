import { useCallback, useLayoutEffect, useRef, useState } from "react"

export default function useHoverSwitch() {
  const [active, setActive] = useState(null)
  const anchor = useRef(null)
  const enter = useCallback(i => setActive(i), [])
  const leave = useCallback(i => setActive(a => (a === i ? null : a)), [])
  // Passing the clicked card keeps it where it was on screen when a card above it closes (stacked phone layout)
  const toggle = useCallback((i, el) => {
    if (el) anchor.current = { el, top: el.getBoundingClientRect().top }
    setActive(a => (a === i ? null : i))
  }, [])

  useLayoutEffect(() => {
    const a = anchor.current
    if (!a) return
    anchor.current = null
    const delta = a.el.getBoundingClientRect().top - a.top
    if (delta) window.scrollBy({ top: delta, behavior: "instant" })
  }, [active])

  return { active, enter, leave, toggle }
}
