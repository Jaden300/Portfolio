import TypeText from "./TypeText"
import { useRowReveal, revealStyle } from "./useRowReveal"
import useHoverSwitch from "./useHoverSwitch"
import useSettled from "./useSettled"
import useExit from "./useExit"
import { PopOuts, TriangleOuts } from "./ProjectsRow"
import { HACKATHONS } from "../data/hackathons"

const HACK_H = 262
const GAP = 12
const ease = "0.45s cubic-bezier(0.16,1,0.3,1)"

function Trophy({ size = 22, color = "var(--gold-text)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
    </svg>
  )
}

function HackathonCard({ h, index, active, onEnter, onLeave, onToggle , shown}) {
  const rv = revealStyle(shown, index)
  const full = useSettled(active)
  const popMounted = useExit(full)

  return (
    <div
      id={h.name.toLowerCase()}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      style={{
        position: "relative", zIndex: active ? 30 : 1,
        flex: active ? 2.3 : 1, minWidth: 0, height: HACK_H, padding: 20, boxSizing: "border-box",
        background: "var(--bg-2)", borderRadius: 16, borderTop: `2px solid ${h.accent}`,
        display: "flex", flexDirection: "column", cursor: "pointer",
        ...rv.style,
        transition: `flex ${ease}, box-shadow 0.3s ease, ${rv.transition}`,
        boxShadow: active ? "0 18px 48px rgba(20,22,28,0.16)" : "none",
      }}
    >
      {/* Top right: a yellow trophy at rest. On hover it fills in as a yellow tag, the result slides out to its left, and the cup stays put */}
      {h.award && (
        <div style={{
          position: "absolute", top: 12, right: 14, display: "flex", alignItems: "center", flexDirection: "row",
          padding: active ? "4px 8px 4px 11px" : "4px 8px 4px 0", borderRadius: 999,
          border: `1px solid ${active ? "var(--gold)" : "transparent"}`,
          background: active ? "var(--gold)" : "transparent",
          transition: "padding 0.5s ease, border-color 0.5s ease, background 0.5s ease",
        }}>
          <span style={{
            display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", fontSize: 11, fontWeight: 700, color: "#ffffff",
            maxWidth: full ? 340 : 0, marginRight: full ? 7 : 0, opacity: full ? 1 : 0,
            transition: `max-width 0.9s cubic-bezier(0.22,1,0.36,1) ${full ? 0.2 : 0}s, margin-right 0.9s ease ${full ? 0.2 : 0}s, opacity 0.6s ease ${full ? 0.35 : 0}s`,
          }}>{h.award} out of {h.teams} teams</span>
          <Trophy size={18} color={active ? "#ffffff" : "var(--gold-text)"} />
        </div>
      )}

      <div style={{ fontSize: 10, color: h.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 10, paddingRight: 36 }}>{h.event}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <img src={h.logo} alt="" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 6, flexShrink: 0 }} />
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", margin: 0, lineHeight: 1.15 }}>{h.name}</h3>
      </div>

      {/* One short sentence resting, three sentences typed out while hovered */}
      <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.65, margin: "0 0 10px" }}>
        {active ? (full ? <TypeText text={h.long} /> : null) : h.short}
      </p>

      {/* Resting teaser image */}
      {!full && (
        <div style={{ flex: 1, minHeight: 0, borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", background: "var(--bg)" }}>
          <img src={h.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, display: "block" }} />
        </div>
      )}

      <div style={{ display: "flex", gap: 8, maxHeight: full ? 48 : 0, marginTop: full ? "auto" : 0, opacity: full ? 1 : 0, overflow: "hidden", transition: `max-height ${ease}, opacity 0.25s ease` }}>
        <a href={h.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#080a0f", background: h.accent, border: `1px solid ${h.accent}`, borderRadius: 6, padding: "9px 0", textDecoration: "none", whiteSpace: "nowrap" }}>
          Visit site
        </a>
        <a href={h.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#080a0f", background: h.accent, border: `1px solid ${h.accent}`, borderRadius: 6, padding: "9px 0", textDecoration: "none", whiteSpace: "nowrap" }}>
          View repo
        </a>
      </div>

      {popMounted && (() => {
        const n = HACKATHONS.length
        const middle = index > 0 && index < n - 1
        // Middle card: images in a triangle around it. End cards: one column over the neighbours.
        if (middle) return <TriangleOuts leaving={!full} images={h.images} accent={h.accent} />
        const side = index === 0 ? "right" : "left"
        return <PopOuts leaving={!full} images={h.images} side={side} count={n - 1} accent={h.accent} />
      })()}
    </div>
  )
}

export default function HackathonsRow() {
  const { active, enter, leave, toggle } = useHoverSwitch()
  const { ref, shown } = useRowReveal()

  return (
    <div ref={ref} style={{ display: "flex", gap: GAP, alignItems: "stretch" }}>
      {HACKATHONS.map((h, i) => (
        <HackathonCard
          key={h.name} h={h} index={i} active={active === i} shown={shown}
          onEnter={() => enter(i)}
          onLeave={() => leave(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}
