import { useState } from "react"
import Reveal from "../components/Reveal"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText("jn.wong.enterprise@gmail.com").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", color:"var(--text)" }}>
      {/* ── HERO */}
      <section style={{
        position:"relative", height:"100vh", minHeight:600,
        display:"flex", flexDirection:"column", justifyContent:"center",
        alignItems:"center", textAlign:"center", zIndex:1, overflow:"hidden",
      }}>
        <div style={{ position:"relative", zIndex:1, padding:"0 48px" }}>
          <div style={{
            fontSize:11, fontWeight:500, letterSpacing:"0.38em", textTransform:"uppercase",
            color:"var(--accent)", marginBottom:24,
            animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both",
            display:"flex", alignItems:"center", gap:16,
          }}>
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
            Research · Collaboration · Opportunities
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
          </div>

          <h1 style={{
            fontFamily:"var(--serif)", fontSize:"clamp(64px,10vw,130px)",
            lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)",
            animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both",
          }}>
            Let's<br /><em style={{ fontStyle:"italic", color:"var(--accent)" }}>talk</em>
          </h1>

          <p style={{
            fontSize:16, fontWeight:300, color:"var(--text-secondary)",
            maxWidth:480, margin:"28px auto 0", lineHeight:1.75,
            animation:"heroFade 1s ease 0.75s both",
          }}>
            ML engineering, biomedical signal processing, research collaborations,
            or just a conversation - reach out any time.
          </p>
        </div>
      </section>

      {/* ── CONTACT BOXES */}
      <section style={{ padding:"80px 48px 120px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:48 }}>Get in touch</h2>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>

            {/* Email */}
            <Reveal delay={0.05} grand>
              <div style={{ background:"var(--bg-2)", borderRadius:20, padding:"36px", borderTop:"2px solid var(--gold)", display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ fontSize:10, color:"var(--text-tertiary)", fontWeight:300, textTransform:"uppercase", letterSpacing:"0.1em" }}>Email</div>
                <div style={{ fontFamily:"var(--serif)", fontSize:15, fontWeight:600, color:"var(--text)", lineHeight:1.4, flex:1 }}>
                  jn.wong.enterprise<br />@gmail.com
                </div>
                <button onClick={copyEmail} style={{
                  background: copied ? "#10B981" : "var(--gold)",
                  color: copied ? "#fff" : "#080a0f",
                  border:"none", borderRadius:8, padding:"11px 0",
                  fontSize:12, fontWeight:700, cursor:"pointer",
                  transition:"all 0.2s", fontFamily:"var(--font)",
                  letterSpacing:"0.08em", textTransform:"uppercase", width:"100%",
                }}>
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
            </Reveal>

            {/* LinkedIn */}
            <Reveal delay={0.1} grand>
              <div style={{ background:"var(--bg-2)", borderRadius:20, padding:"36px", borderTop:"2px solid #0077B5", display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ fontSize:10, color:"var(--text-tertiary)", fontWeight:300, textTransform:"uppercase", letterSpacing:"0.1em" }}>LinkedIn</div>
                <div style={{ fontFamily:"var(--serif)", fontSize:15, fontWeight:600, color:"var(--text)", lineHeight:1.4, flex:1 }}>
                  jaden-wong09
                </div>
                <a href="https://linkedin.com/in/jaden-wong09" target="_blank" rel="noreferrer" style={{
                  display:"block", textAlign:"center",
                  background:"transparent", color:"#0077B5",
                  border:"1px solid #0077B5", borderRadius:8, padding:"11px 0",
                  fontSize:12, fontWeight:700, textDecoration:"none",
                  letterSpacing:"0.08em", textTransform:"uppercase",
                  transition:"background 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#0077B5"; e.currentTarget.style.color = "#fff" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0077B5" }}
                >Visit profile</a>
              </div>
            </Reveal>

            {/* GitHub */}
            <Reveal delay={0.15} grand>
              <div style={{ background:"var(--bg-2)", borderRadius:20, padding:"36px", borderTop:"2px solid var(--text-tertiary)", display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ fontSize:10, color:"var(--text-tertiary)", fontWeight:300, textTransform:"uppercase", letterSpacing:"0.1em" }}>GitHub</div>
                <div style={{ fontFamily:"var(--serif)", fontSize:15, fontWeight:600, color:"var(--text)", lineHeight:1.4, flex:1 }}>
                  Jaden300
                </div>
                <a href="https://github.com/Jaden300" target="_blank" rel="noreferrer" style={{
                  display:"block", textAlign:"center",
                  background:"transparent", color:"var(--text)",
                  border:"1px solid var(--border-dark)", borderRadius:8, padding:"11px 0",
                  fontSize:12, fontWeight:700, textDecoration:"none",
                  letterSpacing:"0.08em", textTransform:"uppercase",
                  transition:"border-color 0.2s, background 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--text)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.background = "transparent" }}
                >View profile</a>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  )
}
