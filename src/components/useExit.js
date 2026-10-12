import { useEffect, useState } from "react"

// Stays true for `ms` after `on` turns false, so something can animate out before it unmounts
export default function useExit(on, ms = 280) {
  const [mounted, setMounted] = useState(on)
  useEffect(() => {
    if (on) { setMounted(true); return }
    const t = setTimeout(() => setMounted(false), ms)
    return () => clearTimeout(t)
  }, [on, ms])
  return mounted
}
