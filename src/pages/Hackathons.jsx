import { useEffect, useState } from "react"
import Reveal from "../components/Reveal"
import Bold from "../components/Bold"
import { GitHubIcon } from "../components/Icons"
import { Chick, Mouse, Hamster, Dino } from "../components/Critters"

const ROTS  = [-6, 3.5, -2]

function ImageStack({ images }) {
  const [hovered, setHovered] = useState(null)
  const CARD_H = 175
  const STEP   = 68
  const count  = images.length
  const containerH = CARD_H + (count - 1) * STEP + 16

  return (
    <div style={{ position:"relative", height:containerH }}>
      {images.map((src, i) => {
        const isHov = hovered === i
        return (
          <img key={i} src={src} alt=""
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position:"absolute",
              top:    i * STEP,
              left:   0, right: 0,
              height: CARD_H,
              width:  "100%",
              objectFit:"cover", borderRadius:12,
              border:"1px solid var(--border)",
              zIndex: isHov ? 10 : count - i,
              transform: isHov
                ? "translateY(-16px) scale(1.05) rotate(0deg)"
                : `rotate(${ROTS[i] ?? 0}deg)`,
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
    name: "MyPillPal",
    eventLogo: "/logos/csh.png",
    projectLogo: "/logos/mypillpal.png",
    year: "2026",
    event: "CSH Social Impact 2026",
    badge: "Winner - Bio + Tech Track",
    teams: "38",
    url: "https://mypillpal.vercel.app/",
    github: "https://github.com/Jaden300/MyPillPal",
    accent: "#3B82F6",
    bullets: [
      "Built a client-only tool turning public **antibiogram data** into a personalized \"**Doctor Conversation Guide**\" - no backend, no accounts, all inputs discarded on tab close",
      "Designed a transparent **weighted risk model** over **10 clinically-sourced factors**, each weight tied to a published odds ratio, plus a priority-ordered rule engine assembling 3-5 doctor questions from 8 clinical rules",
      "Modeled resistance data across **5 infection types** and **10 regions** with every rate source-tagged, built as pure side-effect-free functions decoupled from UI state for auditability",
    ],
    metrics: [["10", "Regions"], ["8", "Clinical rules"], ["10", "Risk factors"], ["7", "Commits"]],
    images: ["/work/mypillpal-1.jpg", "/work/mypillpal-2.jpg", "/work/mypillpal-3.jpg"],
  },
  {
    name: "Pip",
    eventLogo: "/logos/ignitionhacks.png",
    projectLogo: "/logos/pip.png",
    year: "2026",
    event: "Ignition Hacks 2026",
    badge: "2nd Best Use of Base44",
    teams: "87",
    url: "https://verdant-uird.onrender.com/",
    github: "https://github.com/Jaden300/Verdant",
    accent: "#10B981",
    bullets: [
      "Built a full-stack garden simulator turning a natural-language description into an explorable **3D world** with a live care engine - **LLM** extracts plant list, **World Labs Marble** generates the scene, server-side growth model drives outcomes",
      "Engineered a soil/fertilizer/weather growth model as **four multiplied factors** (texture, pH, nutrients, weather), run through **Monte Carlo** forward simulation summarized as p10/p50/p90 uncertainty bands",
      "Built a custom weather generator verified within **0.02°C** of source climate, a **7-biome classifier** against real elevation data, and a **73-crop database** with prompt-keyed world caching",
    ],
    metrics: [["7", "Biomes"], ["73", "Crop database"], ["120", "Monte Carlo trials"], ["365", "Day horizon"]],
    images: ["/work/pip-1.png", "/work/pip-2.png", "/work/pip-3.png"],
  },
  {
    name: "MySquishi",
    eventLogo: "/logos/volthacks.png",
    projectLogo: "/logos/mysquishi.png",
    year: "2026",
    event: "VoltHacks 2026",
    url: "https://mysquishi.onrender.com/",
    github: "https://github.com/Jaden300/MySquishi",
    accent: "#EF4444",
    bullets: [
      "Built a **sEMG**-driven rehab platform (**MyoWare** sensor - **FastAPI**/**scikit-learn** - React) around a single Protocol boundary so live sensor, simulator, and CSV replay sources are interchangeable at runtime with zero consumer changes",
      "Shipped **15 model slices** (signal quality, rep segmentation, EMG-to-force regression, fatigue, recovery trajectory) selected via expanding-window time-series CV, with every predictive output enforcing a structural Interval type",
      "Ran real hardware bring-up logging **Tier A/B/C signal quality** (33.8x contrast, 0% ADC clipping, Cohen's d up to 4.13), which set product scope to 3 effort levels and ruled out per-finger gesture decoding",
    ],
    metrics: [["49", "Commits"], ["434", "Backend tests"], ["9 days", "Build time"], ["15", "Model slices"]],
    images: ["/work/mysquishi-1.jpg", "/work/mysquishi-2.jpg", "/work/mysquishi-3.jpg"],
  },
  {
    name: "MyLumi",
    eventLogo: "/logos/hackforhumanity.png",
    projectLogo: "/logos/mylumi.png",
    year: "2026",
    event: "Hack for Humanity 2026",
    url: "https://mylumi-web.onrender.com/",
    github: "https://github.com/Jaden300/MyLumi",
    accent: "#8B5CF6",
    bullets: [
      "Built a local-first journaling app with no account, no analytics, no server-side copy - a stateless **FastAPI** service fits a model per request and discards the payload with nothing logged",
      "Fit **ridge regression** per request for interpretable symptom-burden forecasting, adaptively shrinking features so limited data can't produce an overconfident overfit model",
      "Ran **Holm-Bonferroni-corrected correlation analysis** and a walk-forward backtest that caught its own prediction interval under-covering, then fixed it - backed by **844 passing tests**",
    ],
    metrics: [["844", "Tests passing"], ["p=0.004", "Key correlation"], ["29", "Body regions"], ["7+", "Night data floor"]],
    images: ["/work/mylumi-1.jpg", "/work/mylumi-2.jpg", "/work/mylumi-3.jpg"],
  },
]

export default function Hackathons() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 175
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }, 400)
    }
  }, [])

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <section style={{ padding:"120px 48px 60px", textAlign:"center" }}>
        <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.38em", textTransform:"uppercase", color:"var(--accent)", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"center", gap:16, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
          <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
          Weekend builds
          <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
        </div>
        <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(52px,8vw,110px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"var(--text)", animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
          Hackathons
        </h1>
        <p style={{ fontSize:16, fontWeight:300, color:"var(--text-secondary)", maxWidth:520, margin:"28px auto 0", lineHeight:1.75, animation:"heroFade 1s ease 0.75s both" }}>
          Weekend builds under real constraints - full-stack products shipped, judged, and deployed in under two weeks.
        </p>
      </section>

      <section style={{ padding: "80px 48px 120px", position: "relative", overflow: "visible" }}>
        <Chick   style={{ top:  150, left:  "2%"  }} />
        <Mouse   style={{ top:  650, right: "2%"  }} />
        <Hamster style={{ top: 1200, left:  "3%"  }} />
        <Dino    style={{ top: 1800, right: "3%"  }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {PROJECTS.map((p, i) => (

            <Reveal key={p.name} delay={i * 0.08} grand>
              <div id={p.name.toLowerCase()} style={{ background: "var(--bg-2)", borderRadius: 24, overflow: "hidden", borderLeft: `3px solid ${p.accent}`, display:"flex" }}>

                {/* Left: logo panel (20% of card width) */}
                <div style={{ flex:"0 0 20%", background:"var(--bg)", display:"flex", flexDirection:"column" }}>
                  <div style={{ flex:"0 0 75%", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                    {p.eventLogo && <img src={p.eventLogo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />}
                  </div>
                  <div style={{ flex:"0 0 25%", display:"flex", alignItems:"center", justifyContent:"center", padding:"8px 12px", textAlign:"center" }}>
                    <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(16px,1.6vw,22px)", fontWeight:700, color:"var(--text)", letterSpacing:"-0.5px", margin:0 }}>{p.event}</h2>
                  </div>
                </div>

                <div style={{ flex:"1 1 auto", padding: "48px", minWidth: 0 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr minmax(0, 360px)", gap:56, alignItems:"start" }}>

                    {/* content */}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                        {p.projectLogo && <img src={p.projectLogo} alt="" style={{ width:36, height:36, objectFit:"contain", borderRadius:6, flexShrink:0 }} />}
                        <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1px", margin:0 }}>{p.name}</h2>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                        {p.bullets.map((b, j) => (
                          <div key={j} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                            <span style={{ color:p.accent, fontWeight:700, flexShrink:0, marginTop:2 }}>•</span>
                            <span style={{ fontSize:14, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.75 }}><Bold text={b} /></span>
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
                    </div>

                    {/* Right: image stack + buttons */}
                    <div style={{ paddingTop:8, display:"flex", flexDirection:"column", gap:14, minWidth:0 }}>
                      <ImageStack images={p.images} />
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ display:"block", textAlign:"center", fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#080a0f", background:p.accent, border:`1px solid ${p.accent}`, borderRadius:8, padding:"14px 0", textDecoration:"none", transition:"filter 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
                        onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
                      >Visit site</a>
                      {p.github && p.github !== p.url && (
                        <a href={p.github} target="_blank" rel="noreferrer" style={{ display:"block", textAlign:"center", fontSize:13, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:8, padding:"14px 0", textDecoration:"none", transition:"border-color 0.2s, color 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--text)"; e.currentTarget.style.color = "var(--text)" }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-tertiary)" }}
                        >View repo</a>
                      )}
                      {p.badge && (
                        <div style={{
                          textAlign:"center", borderRadius:8, padding:"12px 14px",
                          border:"1px solid #f5c542",
                          background:"linear-gradient(110deg, #d4a017 0%, #ffe28a 35%, #fff4c4 45%, #ffe28a 55%, #d4a017 100%)",
                          backgroundSize:"250% 100%",
                          animation:"goldShine 3.2s linear infinite, goldGlow 2.4s ease-in-out infinite",
                        }}>
                          <div style={{ fontSize:13, fontWeight:700, color:"#3a2a05", letterSpacing:"0.02em" }}>{p.badge}</div>
                          {p.teams && <div style={{ fontSize:11, fontWeight:600, color:"#4a3608", marginTop:2 }}>Out of {p.teams} teams</div>}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.22}>
            <div style={{ background: "var(--bg-2)", borderRadius: 24, padding: "22px 48px", borderLeft: "3px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px", marginBottom: 3 }}>See the full list</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300 }}>All hackathon projects on GitHub</div>
              </div>
              <a href="https://github.com/Jaden300" target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", border: "1px solid var(--border-dark)", borderRadius: 6, padding: "10px 22px", textDecoration: "none", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--text)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.background = "transparent" }}
              ><GitHubIcon />GitHub</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
