import { useEffect, useLayoutEffect, useRef, useState } from "react"
import TypeText from "./TypeText"
import { useRowReveal, revealStyle } from "./useRowReveal"
import useHoverSwitch from "./useHoverSwitch"
import useSettled from "./useSettled"
import useExit from "./useExit"
import { PROJECTS } from "../data/projects"

export const ROW_H = 228
const GAP = 12
const IMG_H = 380 // height of each popped-out image
const ease = "0.45s cubic-bezier(0.16,1,0.3,1)"

// How many neighbouring cards sit on the side the pop-outs open towards, by card position
export const NEIGHBOURS = [3, 2, 2, 3]

// All of the card's images fly out of its middle and land stacked in one column over the neighbouring cards.
// The side and width are measured against the window, so the column never runs off the page.
export function PopOuts({ images, side: preferred, count, accent, leaving = false }) {
  const wrapRef = useRef(null)
  const [geo, setGeo] = useState(null)
  const [shown, setShown] = useState(false)

  useLayoutEffect(() => {
    const card = wrapRef.current?.parentElement
    if (!card) return
    const r = card.getBoundingClientRect()
    const vw = document.documentElement.clientWidth
    const neighbour = r.width / 2.3 // every neighbour is 1/2.3 of the expanded card
    // the neighbours' width plus a bit more, as far as the window allows
    const desired = ((count + 0.6) * neighbour + count * GAP) * 0.825 + GAP
    const space = { right: vw - r.right - 8, left: r.left - 8 }
    let side = preferred
    if (space[side] < Math.min(desired, 420)) side = side === "right" ? "left" : "right"
    setGeo({ side, width: Math.max(240, Math.min(desired, space[side])), cardW: r.width })
  }, [count, preferred])

  useEffect(() => {
    if (!geo) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    return () => cancelAnimationFrame(id)
  }, [geo])

  const on = shown && !leaving // leaving: everything shrinks quickly back into the card
  const side = geo?.side ?? preferred
  const near = side === "left" ? "right" : "left"
  // Grows out of the middle of the card: the column is centred on the card, so its origin is the card's middle
  const originX = geo ? (side === "left" ? 100 + (geo.cardW / 2 / geo.width) * 100 : -(geo.cardW / 2 / geo.width) * 100) : 0

  return (
    <div ref={wrapRef} style={{
      position: "absolute", top: "50%", zIndex: 40, [near]: "100%",
      width: geo ? geo.width : 0, boxSizing: "border-box", pointerEvents: "none", visibility: geo ? "visible" : "hidden",
      transform: `translateY(-50%) scale(${on ? 1 : 0.06})`, transformOrigin: `${originX}% 50%`,
      transition: leaving ? "transform 0.22s ease-in" : "transform 0.65s cubic-bezier(0.34,1.3,0.64,1)",
    }}>
      {/* The padding is a transparent strip, so the hover survives the gap between the card and the images */}
      <div style={{ [side === "left" ? "paddingRight" : "paddingLeft"]: GAP, display: "flex", flexDirection: "column", gap: GAP }}>
        {images.map((src, k) => {
          const delay = 0.05 + k * 0.1
          const tilt = [-1.5, 1.5, -1][k % 3]
          return (
            <div key={src} style={{
              display: "flex", justifyContent: side === "left" ? "flex-end" : "flex-start",
              opacity: on ? 1 : 0, transform: `rotate(${on ? tilt : -tilt * 6}deg)`,
              transition: leaving ? "opacity 0.2s ease-in, transform 0.22s ease-in" : `opacity 0.25s ease ${delay}s, transform 0.65s cubic-bezier(0.34,1.3,0.64,1) ${delay}s`,
            }}>
              {/* Natural aspect ratio, so nothing is cropped and there is no dead space around an image */}
              <img src={src} alt="" style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: IMG_H, display: "block", borderRadius: 12, border: `1px solid ${accent}55`, background: "var(--bg)", boxShadow: "0 14px 36px rgba(20,22,28,0.28)" }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// For a card in the middle of a row: two images sit above it side by side and one below, so nothing has to run off the
// sides of the page. Widths are capped to the room the window really has.
export function TriangleOuts({ images, accent, leaving = false }) {
  const wrapRef = useRef(null)
  const [geo, setGeo] = useState(null)
  const [shown, setShown] = useState(false)

  useLayoutEffect(() => {
    const card = wrapRef.current?.parentElement
    if (!card) return
    const r = card.getBoundingClientRect()
    const vw = document.documentElement.clientWidth
    const ext = Math.max(0, Math.min(r.left - 8, vw - r.right - 8, 215)) // how far past the card each side may reach
    const topW = r.width + 2 * ext
    setGeo({ cardH: r.height, topW, belowW: Math.min(topW, 495) })
  }, [])

  useEffect(() => {
    if (!geo) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    return () => cancelAnimationFrame(id)
  }, [geo])

  const on = shown && !leaving // leaving: everything shrinks quickly back into the card
  if (!geo) return <div ref={wrapRef} style={{ position: "absolute", width: 0, height: 0 }} />
  const [a, b, c] = images
  const img = { width: "auto", height: "auto", maxWidth: "100%", maxHeight: IMG_H, display: "block", borderRadius: 12, border: `1px solid ${accent}55`, background: "var(--bg)", boxShadow: "0 14px 36px rgba(20,22,28,0.28)" }
  const pop = delay => leaving ? "transform 0.22s ease-in, opacity 0.2s ease-in" : `transform 0.65s cubic-bezier(0.34,1.3,0.64,1) ${delay}s, opacity 0.25s ease ${delay}s`
  const grow = delay => leaving ? "transform 0.22s ease-in" : `transform 0.65s cubic-bezier(0.34,1.3,0.64,1) ${delay}s`
  const tilted = (tilt, from) => ({ transform: `rotate(${on ? tilt : from}deg)`, opacity: on ? 1 : 0 })

  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none" }}>
      {/* Two above, side by side. They grow out of the middle of the card. */}
      {(a || b) && (
        <div style={{
          position: "absolute", bottom: "100%", left: "50%", width: geo.topW, boxSizing: "border-box", paddingBottom: GAP,
          display: "flex", gap: GAP, alignItems: "flex-end", pointerEvents: "none", cursor: "default",
          transform: `translateX(-50%) scale(${on ? 1 : 0.06})`, transformOrigin: `50% calc(100% + ${geo.cardH / 2}px)`,
          transition: grow(0.05),
        }}>
          {a && <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "flex-end", ...tilted(-2, 10), transition: pop(0.05) }}><img src={a} alt="" style={img} /></div>}
          {b && <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "flex-start", ...tilted(2, -10), transition: pop(0.1) }}><img src={b} alt="" style={img} /></div>}
        </div>
      )}
      {/* One below */}
      {c && (
        <div style={{
          position: "absolute", top: "100%", left: "50%", width: geo.belowW, boxSizing: "border-box", paddingTop: GAP,
          display: "flex", justifyContent: "center", pointerEvents: "none", cursor: "default",
          transform: `translateX(-50%) scale(${on ? 1 : 0.06})`, transformOrigin: `50% ${-geo.cardH / 2}px`,
          transition: grow(0.2),
        }}>
          <div style={{ ...tilted(1, -6), transition: pop(0.2) }}><img src={c} alt="" style={img} /></div>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ p, index, active, onEnter, onLeave, onToggle , shown}) {
  const rv = revealStyle(shown, index)
  const full = useSettled(active)
  const popMounted = useExit(full)

  return (
    <div
      id={p.name.toLowerCase()}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      style={{
        position: "relative", zIndex: active ? 30 : 1,
        flex: active ? 2.3 : 1, minWidth: 0, height: ROW_H, padding: 20, boxSizing: "border-box",
        background: "var(--bg-2)", borderRadius: 16, borderTop: `2px solid ${p.accent}`,
        display: "flex", flexDirection: "column", cursor: "pointer",
        ...rv.style,
        transition: `flex ${ease}, box-shadow 0.3s ease, ${rv.transition}`,
        boxShadow: active ? "0 18px 48px rgba(20,22,28,0.16)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        {p.logo && <img src={p.logo} alt="" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 6, flexShrink: 0 }} />}
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", margin: 0, lineHeight: 1.15 }}>{p.name}</h3>
      </div>

      {/* One short sentence resting, three sentences while hovered */}
      <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.65, margin: "0 0 10px" }}>
        {active ? (full ? <TypeText text={p.long} /> : null) : p.short}
      </p>

      {/* The image shows while resting; on hover it leaves the card and pops out with the others */}
      {!full && (
        <div style={{ flex: 1, minHeight: 0, borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", background: "var(--bg)" }}>
          <img src={p.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, display: "block" }} />
        </div>
      )}

      <div style={{ display: "flex", gap: 8, maxHeight: full ? 48 : 0, marginTop: full ? "auto" : 0, opacity: full ? 1 : 0, overflow: "hidden", transition: "max-height 0.35s ease, margin-top 0.35s ease, opacity 0.25s ease" }}>
        <a href={p.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#080a0f", background: p.accent, border: `1px solid ${p.accent}`, borderRadius: 6, padding: "9px 0", textDecoration: "none", whiteSpace: "nowrap" }}>
          {p.url.includes("github.com") ? "View repo" : "Visit site"}
        </a>
        {p.github && p.github !== p.url && (
          <a href={p.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#080a0f", background: p.accent, border: `1px solid ${p.accent}`, borderRadius: 6, padding: "9px 0", textDecoration: "none", whiteSpace: "nowrap" }}>
            View repo
          </a>
        )}
      </div>

      {popMounted && <PopOuts leaving={!full} images={p.images} side={index < PROJECTS.length / 2 ? "right" : "left"} count={NEIGHBOURS[index] ?? 2} accent={p.accent} />}
    </div>
  )
}

export default function ProjectsRow() {
  const { active, enter, leave, toggle } = useHoverSwitch()
  const { ref, shown } = useRowReveal()

  return (
    <div ref={ref} style={{ display: "flex", gap: GAP, alignItems: "stretch" }}>
      {PROJECTS.map((p, i) => (
        <ProjectCard
          key={p.name} p={p} index={i} active={active === i} shown={shown}
          onEnter={() => enter(i)}
          onLeave={() => leave(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}
