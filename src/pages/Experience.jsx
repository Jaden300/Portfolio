import { useEffect } from "react"
import Reveal from "../components/Reveal"
import { Fox, Penguin } from "../components/Critters"
import { LinkedInIcon } from "../components/Icons"

const ROLES = [
  {
    org: "One Community",
    title: "Software Engineer",
    period: "May 2026 – Present",
    location: "Remote",
    type: "Volunteer, Part-Time",
    accent: "#3B82F6",
    url: null,
    metrics: [["20+", "QA reviews"], ["2", "modules"], ["15+", "UI flows"]],
    bullets: [
      "Built Garden Management dashboard from scratch - 4 metric cards, 4-tab navigation, and a 2×2 calendar grid (16 event slots: Seeding, Transplanting, Succession, Harvesting) with date range, location, yield, and status per event",
      "Built User Management section - 5-column user table, collapsible UI architecture, dark mode support, and empty-state handling; data layer decoupled for seamless API replacement",
      "20+ QA reviews across 10+ dashboard components and 15+ UI flows - surfaced runtime crashes, broken navigation paths, missing imports, and dark mode regressions",
    ],
  },
  {
    org: "The Volunteer Well",
    title: "Web Developer",
    period: "May 2026 – Present",
    location: "Grimsby, ON",
    type: "Volunteer, Part-Time",
    accent: "#8B5CF6",
    metrics: [["5+", "UX issues"], ["3", "deliverables"]],
    bullets: [
      "Manual UX audit across multiple pages - identified 5+ usability and accessibility issues affecting navigation, readability, and conversion flow, each documented with a proposed fix",
      "Traced critical frontend interaction failures in CTA components - broken buttons and misconfigured links that were blocking core user actions from functioning",
      "Delivered a structured UX improvement proposal covering contrast, excessive scroll depth, accessibility, and redundant user pathways",
    ],
    url: null,
  },
  {
    org: "Asenion",
    title: "AI Intern - QA Assistant",
    period: "Sep 2025 – Jan 2026",
    location: "Kitchener, ON",
    type: "Student Co-op",
    accent: "#3B82F6",

    metrics: [["200+", "test prompts"], ["R² ≥ 0.95", "token model"], ["3", "LLM providers"]],
    bullets: [
      "LLM Safety Evaluator - designed 200+ adversarial jailbreak prompts across 10+ attack categories and 8 model configs; classified outputs via confusion matrix analysis (precision + recall); trained Random Forest and KNN classifiers on labeled samples to identify which prompt features predicted successful jailbreaks",
      "Token & Cost Estimator - built Python/Tkinter desktop app with budget-aware model recommendation across OpenAI, Anthropic, and Llama; R² ≥ 0.95 on held-out validation via HuggingFace tokenizer; presented at internal demo sprint, directly resulting in expansion from 1 to 3 provider families",
    ],
    url: null,
  },
]


export default function Experience() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior:"smooth", block:"start" }), 150)
    }
  }, [])

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* HERO */}
      <section style={{
        position: "relative", height: "100vh", minHeight: 600, zIndex: 1,
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", overflow: "hidden",
      }}>
        <div style={{ position: "relative", zIndex: 1, padding: "0 48px" }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 24, animation: "heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "inline-block", width: 32, height: 1, background: "var(--accent)", opacity: 0.6 }} />
            3 roles
            <span style={{ display: "inline-block", width: 32, height: 1, background: "var(--accent)", opacity: 0.6 }} />
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(64px,10vw,130px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--text)", animation: "heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
            Where I've<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>worked</em>
          </h1>
          <p style={{ fontSize: 16, fontWeight: 300, color: "var(--text-secondary)", maxWidth: 480, margin: "28px auto 0", lineHeight: 1.75, animation: "heroFade 1s ease 0.75s both" }}>
            Volunteer engineering, co-op internships, and self-directed projects - building across ML, full-stack, and UX.
          </p>
        </div>
      </section>

      {/* ROLES */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 48px 120px", overflow: "visible" }}>
        <Fox style={{ top: 80, left: "3%" }} />
        <Penguin style={{ bottom: 80, right: "3%" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", marginBottom: 64 }}>Experience</h2>
          </Reveal>

          {ROLES.map((role, i) => (
            <Reveal key={role.org} delay={i * 0.07} grand>
              <div id={role.org.toLowerCase().replace(/\s+/g, "-")} style={{ background: "var(--bg-2)", borderRadius: 24, padding: "48px", marginBottom: 16, borderLeft: `3px solid ${role.accent}` }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <div style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", fontFamily: "var(--serif)", letterSpacing: "-0.5px" }}>{role.org}</div>
                      {role.note && <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 300, fontStyle: "italic" }}>{role.note}</span>}
                    </div>
                    <div style={{ fontSize: 13, color: role.accent, fontWeight: 500, marginBottom: 4 }}>{role.title} &nbsp;·&nbsp; {role.type}</div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300 }}>{role.period} &nbsp;·&nbsp; {role.location}</div>
                  </div>
                  {role.metrics && (
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {role.metrics.map(([v, l]) => (
                        <div key={l} style={{ textAlign: "center", padding: "14px 20px", background: "var(--bg)", borderRadius: 12 }}>
                          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--gold)", fontFamily: "var(--serif)", letterSpacing: "-0.5px" }}>{v}</div>
                          <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {role.bullets.map((b, j) => (
                    <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span style={{ color: role.accent, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>•</span>
                      <span style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75 }}>{b}</span>
                    </div>
                  ))}
                </div>
                {role.url && (
                  <div style={{ marginTop: 24 }}>
                    <a href={role.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: role.accent, fontWeight: 500, letterSpacing: "0.06em", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >{role.url.replace("https://", "")} ↗</a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.22}>
            <div style={{ background: "var(--bg-2)", borderRadius: 24, padding: "22px 48px", borderLeft: "3px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px", marginBottom: 3 }}>See the full list</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300 }}>All experience on LinkedIn</div>
              </div>
              <a href="https://www.linkedin.com/in/jaden-wong09/" target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0077B5", border: "1px solid #0077B5", borderRadius: 6, padding: "10px 22px", textDecoration: "none", transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#0077B5"; e.currentTarget.style.color = "#fff" }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0077B5" }}
              ><LinkedInIcon />LinkedIn</a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
