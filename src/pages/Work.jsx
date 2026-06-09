import { useState, useEffect } from "react"
import Reveal from "../components/Reveal"
import PageBanner from "../components/PageBanner"
import { Dog, Sheep, Bunny } from "../components/Critters"

function ImageStack({ images }) {
  const [hovered, setHovered] = useState(null)
  const offsets = [
    { dx: -10, dy: 8, rot: -3.5 },
    { dx:   6, dy: 4, rot:  2.0 },
    { dx:   0, dy: 0, rot:  0.0 },
  ]
  return (
    <div style={{ position:"relative", height:260 }}>
      {images.map((src, i) => {
        const off = offsets[i] ?? offsets[0]
        const isHov = hovered === i
        return (
          <img key={i} src={src} alt=""
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position:"absolute", inset:0,
              width:"100%", height:"100%",
              objectFit:"cover", borderRadius:12,
              border:"1px solid var(--border)",
              zIndex: isHov ? 10 : i + 1,
              transform: isHov
                ? "translateY(-16px) scale(1.05) rotate(0deg)"
                : `translate(${off.dx}px, ${off.dy}px) rotate(${off.rot}deg)`,
              transition:"transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease",
              boxShadow: isHov
                ? "0 24px 52px rgba(0,0,0,0.55)"
                : "0 4px 20px rgba(0,0,0,0.3)",
            }}
          />
        )
      })}
    </div>
  )
}

const PROJECTS = [
  {
    name: "myojam",
    year: "2024 - present",
    url: "https://myojam.com",
    github: "https://github.com/Jaden300/myojam",
    accent: "#f5e040",
    summary: "Built a full signal pipeline from scratch: Arduino sensors, Butterworth bandpass filtering, 64-feature extraction, and a Random Forest classifier. Deployed as a full-stack web platform with interactive demos - no hardware required.",
    bullets: [
      "Designed the feature extraction stage: 64 features per window (MAV, RMS, Zero Crossing, Waveform Length) across 16 EMG channels, then trained and evaluated using Leave-One-Subject-Out cross-validation",
      "Built the inference layer as a FastAPI service with sub-5ms response time, consumed by a React frontend with 8 interactive browser demos including a signal playground and Scratch-like block-coding interface",
      "Wrote a full PyQt6 desktop app for hardware signal capture, preprocessing, and real-time classification via the same FastAPI backend",
      "Published 11 educational articles, 3 lesson plans, and launched ELEVATE - an international EMG innovation competition",
    ],
    metrics: [["84.85%", "Cross-subject acc"], ["8", "Browser demos"], ["11", "Articles"], ["<5ms", "Inference"]],
    tags: ["Python", "React", "FastAPI", "scikit-learn", "PyQt6", "Three.js", "Arduino"],
    images: ["/work/myojam-1.jpg", "/work/myojam-2.jpg", "/work/myojam-3.jpg"],
  },
  {
    name: "MyMurry",
    year: "2026 - present",
    url: "https://mymurry.com",
    github: null,
    accent: "#A855F7",
    summary: "Built the active recall loop end-to-end: users upload notes, GPT-4o sections them into key concepts, then users recall everything they remember and get scored 0-100 with a breakdown of what they missed.",
    bullets: [
      "Designed and built 21+ REST endpoints across Next.js App Router: note CRUD, AI analysis sessions, Google Calendar and Tasks proxy, TOTP MFA recovery, and public browse",
      "Modelled 9 PostgreSQL tables via Prisma ORM. Implemented Supabase auth with Google OAuth 2.0, silent token refresh, and SHA-256-hashed 2FA recovery codes",
      "Built a custom i18n system with no external library: 700+ translation strings across English, French, and Spanish, with Zustand-persisted Pomodoro timer across navigation",
      "Integrated GPT-4o for section generation and recall scoring - each session produces a point-by-point coverage breakdown showing exactly what concepts were missed",
    ],
    metrics: [["21+", "API endpoints"], ["9", "DB models"], ["700+", "i18n strings"], ["MFA", "2-factor auth"]],
    tags: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "GPT-4o", "Supabase", "Vercel"],
    images: ["/work/mymurry-1.jpg", "/work/mymurry-2.jpg", "/work/mymurry-3.jpg"],
  },
  {
    name: "Quant-Trading",
    year: "2025 - present",
    url: "https://github.com/Jaden300/Quant-Trading",
    github: "https://github.com/Jaden300/Quant-Trading",
    accent: "#10B981",
    summary: "Built a backtesting engine, a grid-search parameter optimizer, and a custom scoring formula. Ran each strategy across 10 large-cap tickers, then promoted the best performers to a live scanner.",
    bullets: [
      "Wrote a bar-by-bar backtesting engine from scratch and a multi-parameter optimizer that runs ~2,140 combinations per strategy across a 5.3-year daily bar history",
      "Designed a custom scoring formula: mean_sharpe - 0.5×std_sharpe + 4×(win_rate/100) - specifically penalizes strategies that are inconsistent across tickers, not just low Sharpe",
      "Built a Kalman filter crossover strategy in NumPy from scratch: dual recursive Bayesian estimators tracking two price series, with no signal-processing library dependency",
      "Wrote a live S&P 500 scanner that downloads OHLCV history for ~491 tickers and outputs ranked signals by confidence score in real time",
    ],
    metrics: [["23", "Strategies"], ["5", "Live"], ["~2,140", "Param combos"], ["491", "Tickers"]],
    tags: ["Python", "NumPy", "pandas", "yfinance", "scikit-learn", "Pine Script v6"],
    images: ["/work/quant-1.jpg", "/work/quant-2.jpg"],
  },
]

export default function Work() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior:"smooth", block:"start" }), 150)
    }
  }, [])

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>
      <PageBanner
        label="Selected work"
        title="What I've"
        accent="built."
        sub="Three projects - EMG systems, a full-stack AI platform, and quantitative trading research."
      />

      <section style={{ padding: "80px 48px 120px", position: "relative", overflow: "visible" }}>
        <Dog style={{ top: 60, right: "3%" }} />
        <Sheep style={{ bottom: 180, left: "3%" }} />
        <Bunny style={{ bottom: 60, right: "6%" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} grand>
              <div id={p.name.toLowerCase()} style={{ background: "var(--bg-2)", borderRadius: 24, overflow: "visible", borderLeft: `3px solid ${p.accent}` }}>
                <div style={{ padding: "48px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:56, alignItems:"start" }}>

                    {/* Left: content */}
                    <div>
                      <div style={{ display:"flex", gap:10, marginBottom:12, alignItems:"center" }}>
                        <span style={{ fontSize:11, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:100, padding:"3px 12px", fontWeight:300 }}>{p.year}</span>
                      </div>
                      <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1px", marginBottom:12 }}>{p.name}</h2>
                      <p style={{ fontSize:15, color:"var(--text-secondary)", lineHeight:1.8, fontWeight:300, marginBottom:28, maxWidth:520 }}>{p.summary}</p>

                      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                        {p.bullets.map((b, j) => (
                          <div key={j} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                            <span style={{ color:p.accent, fontWeight:700, flexShrink:0, marginTop:2 }}>•</span>
                            <span style={{ fontSize:14, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.75 }}>{b}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:28 }}>
                        {p.metrics.map(([v, l]) => (
                          <div key={l} style={{ background:"var(--bg)", borderRadius:12, padding:"14px", textAlign:"center" }}>
                            <div style={{ fontSize:16, fontWeight:800, color:p.accent, fontFamily:"var(--serif)", letterSpacing:"-0.5px", marginBottom:2 }}>{v}</div>
                            <div style={{ fontSize:10, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{l}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                          {p.tags.map(t => (
                            <span key={t} style={{ fontSize:11, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:100, padding:"3px 12px", fontWeight:300 }}>{t}</span>
                          ))}
                        </div>
                        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                          {p.github && p.github !== p.url && (
                            <a href={p.github} target="_blank" rel="noreferrer" style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:500, textDecoration:"none", letterSpacing:"0.06em" }}
                              onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                              onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}
                            >GitHub ↗</a>
                          )}
                          <a href={p.url} target="_blank" rel="noreferrer" style={{ fontSize:12, color:p.accent, fontWeight:600, textDecoration:"none", letterSpacing:"0.06em" }}
                            onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                          >{p.url.includes("github.com") ? "View repo ↗" : "Visit site ↗"}</a>
                        </div>
                      </div>
                    </div>

                    {/* Right: image stack */}
                    <div style={{ paddingTop:8 }}>
                      <ImageStack images={p.images} />
                    </div>

                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
