import { useEffect, useState } from "react"

// True on phone and small tablet widths, where the cards stack and images go inside the card
export default function useIsMobile(max = 900) {
  const query = `(max-width: ${max}px)`
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    mq.addEventListener("change", on)
    on()
    return () => mq.removeEventListener("change", on)
  }, [query])
  return m
}
