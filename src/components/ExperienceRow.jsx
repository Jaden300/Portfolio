import TypeText from "./TypeText"
import { useRowReveal, revealStyle } from "./useRowReveal"
import useHoverSwitch from "./useHoverSwitch"
import useSettled from "./useSettled"
import useIsMobile from "./useIsMobile"
import { ROLES } from "../data/roles"
import { ROW_H } from "./ProjectsRow"

const GAP = 12
const ease = "0.45s cubic-bezier(0.16,1,0.3,1)"

function RoleCard({ r, index, active, onEnter, onLeave, onToggle , shown}) {
  const rv = revealStyle(shown, index)
  const full = useSettled(active)
  const mobile = useIsMobile()
  return (
    <div
      id={r.org.toLowerCase().replace(/\s+/g, "-")}
      onMouseEnter={mobile ? undefined : onEnter}
      onMouseLeave={mobile ? undefined : onLeave}
      onClick={onToggle}
      style={{
        flex: active ? 2.3 : 1, minWidth: 0, height: ROW_H, padding: 20, boxSizing: "border-box",
        background: "var(--bg-2)", borderRadius: 16, borderTop: `2px solid ${r.accent}`,
        display: "flex", flexDirection: "column", cursor: "pointer",
        ...rv.style,
        transition: `flex ${ease}, box-shadow 0.3s ease, ${rv.transition}`,
        boxShadow: active ? "0 18px 48px rgba(20,22,28,0.16)" : "none",
      }}
    >
      <div style={{ fontSize: 10, color: r.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 10 }}>{r.type}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        {r.logo && <img src={r.logo} alt="" style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 6, flexShrink: 0 }} />}
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", margin: 0, lineHeight: 1.15 }}>{r.org}</h3>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 400, marginBottom: 12 }}>{r.title}</div>

      {/* One short sentence resting, three sentences while hovered */}
      <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.65, margin: 0 }}>
        {active ? (full ? <TypeText text={r.long} /> : null) : r.short}
      </p>

    </div>
  )
}

export default function ExperienceRow() {
  const { active, enter, leave, toggle } = useHoverSwitch()
  const { ref, shown } = useRowReveal()

  return (
    <div ref={ref} className="card-row" style={{ display: "flex", gap: GAP, alignItems: "stretch" }}>
      {ROLES.map((r, i) => (
        <RoleCard
          key={r.org} r={r} index={i} active={active === i} shown={shown}
          onEnter={() => enter(i)}
          onLeave={() => leave(i)}
          onToggle={e => toggle(i, e.currentTarget)}
        />
      ))}
    </div>
  )
}
