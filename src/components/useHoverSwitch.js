import { useCallback, useState } from "react"

// Which card in a row is open: opens when hovered, closes when the pointer leaves
export default function useHoverSwitch() {
  const [active, setActive] = useState(null)
  const enter = useCallback(i => setActive(i), [])
  const leave = useCallback(i => setActive(a => (a === i ? null : a)), [])
  const toggle = useCallback(i => setActive(a => (a === i ? null : i)), [])
  return { active, enter, leave, toggle }
}
