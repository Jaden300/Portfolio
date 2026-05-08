import { useEffect, useRef, useState } from "react"

const GESTURES = [
  { label: "Rest",        pct: 95, color: "#10B981" },
  { label: "Open hand",   pct: 88, color: "#f5e040" },
  { label: "Cylindrical", pct: 83, color: "#f5e040" },
  { label: "Lateral",     pct: 80, color: "#fbbf24" },
  { label: "Hook",        pct: 76, color: "#fbbf24" },
  { label: "Pinch",       pct: 71, color: "#f97316" },
]

const SKILLS_PROF = [
  { label: "Python",            pct: 90, color: "#f5e040" },
  { label: "Machine Learning",  pct: 85, color: "#f5e040" },
  { label: "Signal Processing", pct: 80, color: "#fbbf24" },
  { label: "React / JS",        pct: 76, color: "#fbbf24" },
  { label: "FastAPI",           pct: 74, color: "#fef3c7" },
  { label: "Three.js / Canvas", pct: 68, color: "#fef3c7" },
  { label: "Arduino / C++",     pct: 60, color: "#fef3c7" },
]

function useVisible(threshold = 0.3) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

export function AccuracyGauge({ pct = 84.85, size = 148 }) {
  const R = 48, C = 2 * Math.PI * R
  const filled = (pct / 100) * C
  const [ref, visible] = useVisible(0.4)
  return (
    <div ref={ref} style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox="0 0 120 120" style={{ overflow:"visible" }}>
        {/* Decorative outer ring */}
        <circle cx="60" cy="60" r="57" fill="none" stroke="rgba(245,224,64,0.07)" strokeWidth="1" />
        {/* Track */}
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(237,234,226,0.07)" strokeWidth="11" />
        {/* Gold fill arc */}
        <circle cx="60" cy="60" r={R} fill="none"
          stroke={visible ? "#f5e040" : "transparent"}
          strokeWidth="11"
          strokeDasharray={`${visible ? filled : 0} ${C}`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition:"stroke-dasharray 1.4s cubic-bezier(0.16,1,0.3,1) 0.15s, stroke 0.2s" }}
        />
        {/* Glow dot at end of arc */}
        {visible && (
          <circle
            cx={60 + R * Math.cos((filled / C) * 2 * Math.PI - Math.PI / 2)}
            cy={60 + R * Math.sin((filled / C) * 2 * Math.PI - Math.PI / 2)}
            r="5" fill="#f5e040" opacity="0.7"
          />
        )}
        <text x="60" y="55" textAnchor="middle" fill="#edeae2" fontSize="19" fontWeight="700"
          fontFamily="DM Serif Display,Georgia,serif" letterSpacing="-0.5">
          {pct}%
        </text>
        <text x="60" y="70" textAnchor="middle" fill="rgba(237,234,226,0.35)" fontSize="8"
          fontFamily="Inter,sans-serif" letterSpacing="1.8">
          ACCURACY
        </text>
      </svg>
    </div>
  )
}

export function GestureAccuracyBars() {
  const [ref, visible] = useVisible(0.25)
  return (
    <div ref={ref}>
      <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:16, fontFamily:"var(--serif)" }}>
        Per-gesture accuracy
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
        {GESTURES.map((g, i) => (
          <div key={g.label} style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:11, color:"var(--text-tertiary)", minWidth:94, fontWeight:300, letterSpacing:"0.03em" }}>{g.label}</span>
            <div style={{ flex:1, height:5, background:"rgba(237,234,226,0.06)", borderRadius:3, overflow:"hidden" }}>
              <div style={{
                height:"100%",
                width: visible ? `${g.pct}%` : "0%",
                background:`linear-gradient(to right, #f5e040, ${g.color})`,
                borderRadius:3,
                transition:`width 0.95s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              }} />
            </div>
            <span style={{ fontSize:11, color:g.color, fontWeight:700, minWidth:34, textAlign:"right", fontFamily:"var(--serif)" }}>{g.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillProficiencyBars() {
  const [ref, visible] = useVisible(0.25)
  return (
    <div ref={ref}>
      <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
        {SKILLS_PROF.map((s, i) => (
          <div key={s.label} style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:11, color:"var(--text-tertiary)", minWidth:138, fontWeight:300, letterSpacing:"0.03em" }}>{s.label}</span>
            <div style={{ flex:1, height:5, background:"rgba(237,234,226,0.06)", borderRadius:3, overflow:"hidden" }}>
              <div style={{
                height:"100%",
                width: visible ? `${s.pct}%` : "0%",
                background:`linear-gradient(to right, ${s.color}88, ${s.color})`,
                borderRadius:3,
                transition:`width 0.95s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
              }} />
            </div>
            <span style={{ fontSize:11, color:s.color, fontWeight:700, minWidth:32, textAlign:"right", fontFamily:"var(--serif)", opacity:0.8 }}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PIPELINE = [
  { label:"Raw EMG",     sub:"16ch · 200Hz",    color:"#3B82F6" },
  { label:"Filter",      sub:"Butterworth 4th",  color:"#8B5CF6" },
  { label:"Window",      sub:"200 samples · 50% overlap", color:"#f5e040" },
  { label:"Features",    sub:"64-D vector",      color:"#f5e040" },
  { label:"Random Forest",sub:"100 trees",       color:"#10B981" },
  { label:"Gesture",     sub:"6 classes",        color:"#10B981" },
]

export function PipelineViz() {
  const [ref, visible] = useVisible(0.2)
  return (
    <div ref={ref} style={{ overflowX:"auto" }}>
      <div style={{ display:"flex", alignItems:"center", gap:0, minWidth:640, paddingBottom:4 }}>
        {PIPELINE.map((step, i) => (
          <div key={step.label} style={{ display:"flex", alignItems:"center", flex:1 }}>
            <div style={{
              flex:1,
              background:"var(--bg-2)",
              border:`1px solid ${step.color}30`,
              borderRadius:10,
              padding:"12px 14px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition:`opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
            }}>
              <div style={{ fontSize:10, fontWeight:700, color:step.color, letterSpacing:"0.06em", marginBottom:4 }}>{step.label}</div>
              <div style={{ fontSize:9, color:"var(--text-tertiary)", fontWeight:300, lineHeight:1.4 }}>{step.sub}</div>
            </div>
            {i < PIPELINE.length - 1 && (
              <div style={{ color:"rgba(237,234,226,0.2)", fontSize:14, margin:"0 3px", flexShrink:0 }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
