import { useEffect, useState } from "react"

// True once `active` has stayed true for `ms`, false again the instant it goes false.
// Lets a card finish widening before its long text (and pop-outs) appear, so text never overflows a still-narrow box.
export default function useSettled(active, ms = 100) {
  const [settled, setSettled] = useState(false)
  useEffect(() => {
    if (!active) { setSettled(false); return }
    const t = setTimeout(() => setSettled(true), ms)
    return () => clearTimeout(t)
  }, [active, ms])
  return active && settled
}
