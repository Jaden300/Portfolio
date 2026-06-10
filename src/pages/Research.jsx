import Reveal from "../components/Reveal"

const FEATURED = [
  {
    title: "myojam: Open-Source Surface EMG Gesture Classification for Assistive Human-Computer Interaction",
    tag: "Technical Report",
    date: "April 2026",
    desc: "84.85% cross-subject accuracy on Ninapro DB5. Open-source surface EMG gesture classification - Random Forest classifier trained on 64-dimensional time-domain features across 16 electrode channels.",
    url: "https://myojam.com/research",
  },
  {
    title: "Build your own EMG sensor for under $60",
    tag: "Hardware",
    date: "October 2025",
    desc: "A complete weekend project guide: parts list, wiring, Arduino firmware, electrode placement, and signal quality checks.",
    url: "https://myojam.com/education/build-your-own",
  },
  {
    title: "After EMG: what comes next",
    tag: "Future",
    date: "September 2025",
    desc: "Surface EMG is one point on a spectrum from skin sensing to direct neural recording. HD-sEMG, peripheral nerve interfaces, and motor cortex decoding.",
    url: "https://myojam.com/education/future-of-bci",
  },
]

const TAG_COLORS = {
  "Technical Report": "#f5e040",
  "Foundations":      "#FF375F",
  "Machine Learning": "#3B82F6",
  "Accessibility":    "#8B5CF6",
  "Dataset":          "#10B981",
  "Neuroscience":     "#F59E0B",
  "Signal Processing":"#06B6D4",
  "Future":           "#A855F7",
  "Ethics":           "#EC4899",
  "Hardware":         "#84CC16",
}

const RESOURCES = [
  {
    title: "EMG Basics - full lesson plan",
    type: "Lesson Plan",
    audience: "Grades 9-12 · Biology / Physics",
    duration: "75 min",
    desc: "Complete classroom-ready lesson including timed phases, student activities, teacher notes, differentiation strategies, and a 4-point assessment rubric.",
    url: "https://myojam.com/educators/lesson-emg-basics",
  },
  {
    title: "Teaching a machine to read gestures",
    type: "Lesson Plan",
    audience: "Grades 10-12 / Intro university · CS / Data Science",
    duration: "90 min",
    desc: "Hands-on ML lesson covering feature extraction, decision boundaries, and confusion matrix interpretation - using real Ninapro data.",
    url: "https://myojam.com/educators/lesson-gesture-classifier",
  },
  {
    title: "myocode: code with your muscles",
    type: "Lesson Plan",
    audience: "Grades 6-10 · CS / STEM",
    duration: "60 min",
    desc: "Introduces event-driven programming through myocode, myojam's block coding environment where EMG gestures are first-class events.",
    url: "https://myojam.com/educators/lesson-myocode",
  },
]

export default function Research() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", color:"var(--text)" }}>
      {/* ── HERO */}
      <section style={{
        position:"relative", height:"100vh", minHeight:600, zIndex:1,
        display:"flex", flexDirection:"column", justifyContent:"center",
        alignItems:"center", textAlign:"center", overflow:"hidden",
      }}>
        <div style={{ position:"relative", zIndex:1, padding:"0 48px" }}>
          <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.38em", textTransform:"uppercase", color:"var(--accent)", marginBottom:24, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both", display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
            12 articles · 3 lesson plans · openly published
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
          </div>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(64px,10vw,130px)", lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)", animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
            Blog &<br /><em style={{ fontStyle:"italic", color:"var(--accent)" }}>writing</em>
          </h1>
          <p style={{ fontSize:16, fontWeight:300, color:"var(--text-secondary)", maxWidth:520, margin:"28px auto 0", lineHeight:1.75, animation:"heroFade 1s ease 0.75s both" }}>
            A technical report, eleven articles spanning neuroscience, signal processing, and ML ethics, and three educator-ready lesson plans - all openly published on myojam.com.
          </p>
        </div>
      </section>

      {/* ── ARTICLES */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:56, flexWrap:"wrap", gap:16 }}>
              <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>Articles</h2>
              <a href="https://www.myojam.com/education" target="_blank" rel="noreferrer"
                style={{ fontSize:13, color:"var(--gold)", fontWeight:500, letterSpacing:"0.06em", textDecoration:"none" }}
                onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
                onMouseLeave={e => e.currentTarget.style.opacity="1"}
              >See more ↗</a>
            </div>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {FEATURED.map((article, i) => {
              const tc = TAG_COLORS[article.tag] || "var(--gold)"
              return (
                <Reveal key={article.title} delay={i * 0.07} grand>
                  <a href={article.url} target="_blank" rel="noreferrer" style={{ display:"block", textDecoration:"none", height:"100%" }}
                    onMouseEnter={e => e.currentTarget.querySelector(".acard").style.background = "var(--bg)"}
                    onMouseLeave={e => e.currentTarget.querySelector(".acard").style.background = "var(--bg-2)"}
                  >
                    <div className="acard" style={{ background:"var(--bg-2)", borderRadius:20, padding:"32px", height:"100%", transition:"background 0.2s", borderTop:`3px solid ${tc}`, boxSizing:"border-box", display:"flex", flexDirection:"column" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:tc, background:`${tc}15`, border:`1px solid ${tc}30`, borderRadius:100, padding:"3px 12px", textTransform:"uppercase", letterSpacing:"0.08em", alignSelf:"flex-start", marginBottom:20 }}>{article.tag}</span>
                      <h3 style={{ fontFamily:"var(--serif)", fontSize:"clamp(15px,1.6vw,18px)", fontWeight:700, color:"var(--text)", letterSpacing:"-0.3px", lineHeight:1.3, marginBottom:14, flex:1 }}>{article.title}</h3>
                      <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.75, fontWeight:300, marginBottom:20 }}>{article.desc}</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:11, color:"var(--text-tertiary)", fontWeight:300 }}>{article.date}</span>
                        <span style={{ fontSize:13, color:tc, fontWeight:600 }}>Read ↗</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL RESOURCES */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px 120px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:56 }}>Educational resources</h2>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <a href={r.url} target="_blank" rel="noreferrer" style={{ display:"block", textDecoration:"none" }}
                  onMouseEnter={e => e.currentTarget.querySelector(".rcard").style.background = "var(--bg)"}
                  onMouseLeave={e => e.currentTarget.querySelector(".rcard").style.background = "var(--bg-2)"}
                >
                  <div className="rcard" style={{
                    background:"var(--bg-2)", padding:"36px", transition:"background 0.2s",
                    borderRadius: i===0 ? "20px 0 0 20px" : i===2 ? "0 20px 20px 0" : "0",
                  }}>
                    <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"var(--gold)", background:"rgba(245,224,64,0.08)", border:"1px solid rgba(245,224,64,0.22)", borderRadius:100, padding:"3px 12px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{r.type}</span>
                      <span style={{ fontSize:10, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:100, padding:"3px 10px", fontWeight:300 }}>{r.duration}</span>
                    </div>
                    <div style={{ fontFamily:"var(--serif)", fontSize:17, fontWeight:700, color:"var(--text)", marginBottom:8, lineHeight:1.3, letterSpacing:"-0.3px" }}>{r.title}</div>
                    <div style={{ fontSize:11, color:"var(--gold)", fontWeight:500, marginBottom:14, letterSpacing:"0.04em" }}>{r.audience}</div>
                    <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.75, fontWeight:300, marginBottom:20 }}>{r.desc}</p>
                    <span style={{ fontSize:12, fontWeight:600, color:"var(--gold)", letterSpacing:"0.06em" }}>View lesson plan ↗</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
