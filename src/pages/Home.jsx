import { lazy, Suspense, useEffect, useState } from "react"
import Reveal from "../components/Reveal"
import ChessHero from "../components/ChessHero"
import ProjectsRow from "../components/ProjectsRow"
import ExperienceRow from "../components/ExperienceRow"
import HackathonsRow from "../components/HackathonsRow"
import AboutRow from "../components/AboutRow"
import ContactRow from "../components/ContactRow"

// Loaded only when the board is clicked, so the chess engine never slows the page down
const loadChess = () => import("../components/ChessGame")
const ChessGame = lazy(loadChess)

// Warm the browser cache with the game code and the engine files, so clicking the board opens it straight away
const warmChess = () => {
  loadChess()
  fetch("/stockfish/stockfish-19-lite-single.js").catch(() => {})
  fetch("/stockfish/stockfish-19-lite-single.wasm").catch(() => {})
}
import { GitHubIcon, LinkedInIcon, ArrowUpRight } from "../components/Icons"

// Live Toronto time, ticking every second
function TorontoClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString("en-CA", { timeZone: "America/Toronto", hour: "numeric", minute: "2-digit" })
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:12, letterSpacing:"0.08em", color:"var(--text-secondary)", marginBottom:22, fontVariantNumeric:"tabular-nums", border:"1px solid var(--border-dark)", borderRadius:6, padding:"7px 14px", animation:"heroFade 0.9s ease 0.95s both" }}>
      <span style={{ fontWeight:700, color:"var(--text)", letterSpacing:"0.14em" }}>YYZ</span>
      {time}
    </div>
  )
}

export default function Home() {
  const [chessOpen, setChessOpen] = useState(false)
  useEffect(() => {
    const t = setTimeout(warmChess, 1200)
    return () => clearTimeout(t)
  }, [])
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>

      {/* ── HERO */}
      <section style={{
        position: "relative", zIndex: 1,
        paddingTop: 40,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        overflow: "hidden",
      }}>

        {/* Faint cursive "Wong" backdrop */}
        <div style={{
          position:"absolute", inset:0, zIndex:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          pointerEvents:"none",
        }}>
          <span style={{
            fontFamily:"'Dancing Script', cursive",
            fontSize:"clamp(160px, 30vw, 420px)",
            color:"rgba(20,22,28,0.05)",
            fontWeight:700,
            lineHeight:1,
            userSelect:"none",
            letterSpacing:"-0.01em",
          }}>Wong</span>
        </div>

        <div className="hero-in" style={{ position:"relative", zIndex:3, padding:"0 48px 36px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <img src="/profile.jpg" alt="Jaden Wong" style={{ width:116, height:116, borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(20,22,28,0.25)", marginBottom:20, animation:"heroFade 0.9s ease 0.1s both" }} />
          <div style={{ display:"inline-flex", alignItems:"center", gap:14, fontSize:11, fontWeight:500, letterSpacing:"0.34em", textTransform:"uppercase", color:"var(--accent)", marginBottom:16, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
            <span className="hero-rule" style={{ display:"inline-block", width:28, height:1, background:"var(--accent)", opacity:0.7 }} />
            Engineer • Researcher • Builder
            <span className="hero-rule" style={{ display:"inline-block", width:28, height:1, background:"var(--accent)", opacity:0.7 }} />
          </div>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(60px,8vw,120px)", lineHeight:0.93, letterSpacing:"-0.02em", color:"var(--text)", marginBottom:8, animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.38s both" }}>
            Jaden
          </h1>
          <p style={{ fontSize:13, letterSpacing:"0.06em", color:"var(--text-tertiary)", marginBottom:14, animation:"heroFade 0.9s ease 0.85s both" }}>
            ML Engineering • Signal Processing • Toronto, Ontario
          </p>
          <TorontoClock />
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", animation:"heroFade 0.9s ease 1.05s both" }}>
            {(() => {
              const s = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, width:148, fontSize:11, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", padding:"11px 0", borderRadius:3, cursor:"pointer", fontFamily:"var(--font)", textDecoration:"none", boxSizing:"border-box" }
              return <>
                <a className="hero-btn" href="https://github.com/Jaden300" target="_blank" rel="noreferrer" style={s}><GitHubIcon />GitHub<ArrowUpRight /></a>
                <a className="hero-btn" href="https://www.linkedin.com/in/jaden-wong09/" target="_blank" rel="noreferrer" style={s}><LinkedInIcon />LinkedIn<ArrowUpRight /></a>
                <a className="hero-btn" href="mailto:jn.wong.enterprise@gmail.com" style={s}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>Email<ArrowUpRight />
                </a>
              </>
            })()}
          </div>
        </div>
      </section>

      {/* ── BIO */}
      <section className="bio-grid" style={{ position:"relative", zIndex:1, padding:"48px 48px 56px", display:"grid", gridTemplateColumns:"260px 1fr", gap:"0 80px", borderBottom:"1px solid var(--border)" }}>
        <Reveal delay={0.1} grand>
          <div>
            <div
              onClick={() => setChessOpen(true)}
              onMouseEnter={warmChess}
              title="Click to play a game"
              style={{ position:"relative", width:"100%", height:220, marginTop:0, overflow:"hidden", borderRadius:12, cursor:"pointer" }}
            >
              <ChessHero />
            </div>
            {/* Hand-drawn arrow pointing up at the board */}
            <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginTop:6, paddingLeft:28, color:"var(--text-secondary)", pointerEvents:"none" }}>
              <svg width="64" height="92" viewBox="0 0 64 92" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 88 C 4 70, 34 66, 32 50 C 30 36, 10 38, 15 49 C 20 60, 46 44, 42 12" />
                <path d="M42 12 C 36 18, 33 22, 31 27 M42 12 C 46 17, 50 21, 55 24" />
              </svg>
              <span style={{ fontFamily:"var(--font)", fontSize:15, fontWeight:500, letterSpacing:"0.04em", marginTop:46, whiteSpace:"nowrap" }}>Click me!</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} grand>
          <div>
            <p style={{ fontSize:17, fontWeight:300, lineHeight:1.82, color:"rgba(20,22,28,0.72)", marginBottom:24 }}>
              I'm a <strong style={{ color:"var(--text)", fontWeight:500 }}>17-year-old engineer and researcher</strong> from Toronto. I build ML systems, AI web platforms, and quant trading frameworks.
            </p>
            <p style={{ fontSize:17, fontWeight:300, lineHeight:1.82, color:"rgba(20,22,28,0.72)" }}>
              SWE at <strong style={{ color:"var(--text)", fontWeight:500 }}>One Community</strong> and <strong style={{ color:"var(--text)", fontWeight:500 }}>The Volunteer Well</strong>. Previously AI intern at <strong style={{ color:"var(--text)", fontWeight:500 }}>Asenion</strong> and founder of <strong style={{ color:"var(--text)", fontWeight:500 }}>MyMurry</strong>.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(108px,1fr))", gap:10, marginTop:44 }}>
              {["Python","React","Next.js","TypeScript","FastAPI","PostgreSQL","GPT-4o","scikit-learn","Signal Processing","Three.js"].map(chip => (
                <div key={chip} style={{ display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:500, letterSpacing:"0.14em", color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:4, padding:"10px 8px", transition:"border-color 0.2s, color 0.2s", textAlign:"center", cursor:"default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(20,22,28,0.5)"; e.currentTarget.style.color = "var(--text)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-tertiary)" }}
                >{chip}</div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, minmax(0, 170px))", gap:10, marginTop:10, justifyContent:"center" }}>
              {[
                { val:"12+", label:"Months of experience", to:"experience" },
                { val:"8",   label:"Projects",             to:"projects" },
                { val:"3",   label:"Hackathon wins",       to:"hackathons" },
              ].map(st => (
                <a key={st.label} href={`#${st.to}`} className="stat-box"
                  onClick={e => { e.preventDefault(); document.getElementById(st.to)?.scrollIntoView({ behavior: "smooth", block: "start" }) }}>
                  <div style={{ fontFamily:"var(--serif)", fontSize:30, lineHeight:1, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:8 }}>{st.val}</div>
                  <div className="stat-label" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--text-tertiary)" }}>{st.label}</div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── PROJECTS */}
      <section className="sec" id="projects" style={{ padding:"36px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 style={{ display:"flex", alignItems:"center", gap:16, fontFamily:"var(--serif)", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--gold-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
                </svg>
                Projects
              </h2>
            </div>
          </Reveal>
          <ProjectsRow />
        </div>
      </section>

      {/* ── EXPERIENCE */}
      <section className="sec" id="experience" style={{ padding:"36px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 style={{ display:"flex", alignItems:"center", gap:16, fontFamily:"var(--serif)", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--gold-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
                </svg>
                Experience
              </h2>
            </div>
          </Reveal>
          <ExperienceRow />
        </div>
      </section>

      {/* ── HACKATHONS */}
      <section className="sec" id="hackathons" style={{ padding:"36px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:20 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 style={{ display:"flex", alignItems:"center", gap:16, fontFamily:"var(--serif)", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--gold-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
                Hackathons
              </h2>
            </div>
          </Reveal>
          <HackathonsRow />
        </div>
      </section>

      {/* ── ABOUT */}
      <section className="sec" id="about" style={{ padding:"36px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 style={{ display:"flex", alignItems:"center", gap:16, fontFamily:"var(--serif)", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--gold-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                </svg>
                About me
              </h2>
            </div>
          </Reveal>
          <AboutRow />
        </div>
      </section>

      {/* ── CONTACT */}
      <section className="sec" id="contact" style={{ padding:"36px 48px 64px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 style={{ display:"flex", alignItems:"center", gap:16, fontFamily:"var(--serif)", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--gold-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                Get in touch
              </h2>
            </div>
          </Reveal>
          <ContactRow />

          {/* Back to top */}
          <div style={{ display:"flex", justifyContent:"center", marginTop:48 }}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="to-top">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>



      {chessOpen && (
        <Suspense fallback={null}>
          <ChessGame onClose={() => setChessOpen(false)} />
        </Suspense>
      )}
    </div>
  )
}
