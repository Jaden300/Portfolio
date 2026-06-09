import Reveal from "../components/Reveal"
import ParticleWarp from "../components/ParticleWarp"
import { Fox, Penguin, Mouse, Owl } from "../components/Critters"

const ROLES = [
  {
    org: "One Community",
    title: "Software Engineer",
    period: "May 2026 – Present",
    location: "Remote",
    type: "Volunteer, Part-Time",
    accent: "#3B82F6",
    bullets: [
      "Built Garden Management dashboard from scratch - 4 metric cards, 4-tab navigation, and a 2×2 calendar grid (16 event slots: Seeding, Transplanting, Succession, Harvesting) with date range, location, yield, and status per event",
      "Built User Management section - 5-column user table, collapsible UI architecture, dark mode support, and empty-state handling; data layer decoupled for seamless API replacement",
      "20+ QA reviews across 10+ dashboard components and 15+ UI flows - surfaced runtime crashes, broken navigation paths, missing imports, and dark mode regressions",
    ],
    url: "https://www.onecommunity.cc",
  },
  {
    org: "The Volunteer Well",
    title: "Web Developer",
    period: "May 2026 – Present",
    location: "Grimsby, ON",
    type: "Volunteer, Part-Time",
    accent: "#8B5CF6",
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
    note: "formerly Fairly AI",
    metrics: [["200+", "test prompts"], ["R² ≥ 0.95", "token model"], ["3", "LLM providers"]],
    bullets: [
      "LLM Safety Evaluator - designed 200+ adversarial jailbreak prompts across 10+ attack categories and 8 model configs; classified outputs via confusion matrix analysis (precision + recall); trained Random Forest and KNN classifiers on labeled samples to identify which prompt features predicted successful jailbreaks",
      "Token & Cost Estimator - built Python/Tkinter desktop app with budget-aware model recommendation across OpenAI, Anthropic, and Llama; R² ≥ 0.95 on held-out validation via HuggingFace tokenizer; presented at internal demo sprint, directly resulting in expansion from 1 to 3 provider families",
    ],
    url: null,
  },
  {
    org: "myojam",
    title: "Co-founder & Lead Developer",
    period: "Sep 2024 – Present",
    location: "Remote",
    type: "Volunteer",
    accent: "#f5e040",
    metrics: [["84.85%", "accuracy"], ["11", "articles"], ["MIT", "license"]],
    bullets: [
      "Built an open-source sEMG gesture classifier from scratch - 84.85% cross-subject accuracy on Ninapro DB5",
      "Designed and shipped the full stack: FastAPI backend, React/Vite frontend, PyQt6 native macOS app",
      "Published 11 educational articles and 3 lesson plans; launched the ELEVATE international EMG competition",
      "No lab access, no funding, no hardware - built entirely from public data and open-source tooling",
    ],
    url: "https://myojam.com",
  },
]

const CERTS = [
  { name: "IBM Machine Learning Professional Certificate", issuer: "IBM", date: "Dec 2025" },
  { name: "IBM Introduction to Machine Learning Specialization", issuer: "IBM", date: "Dec 2025" },
  { name: "Google AI Professional Certificate", issuer: "Google", date: "Apr 2026" },
]

export default function Experience() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <ParticleWarp />

      {/* HERO */}
      <section style={{
        position: "relative", height: "100vh", minHeight: 600, zIndex: 1,
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none" }}>
          <span style={{ fontFamily: "'Noto Serif CJK SC','Hiragino Mincho ProN','SimSun',serif", fontWeight: 900, fontSize: "78vw", lineHeight: 1, color: "var(--accent)", opacity: 0.03 }}>業</span>
        </div>
        <div style={{ position: "relative", zIndex: 1, padding: "0 48px" }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 24, animation: "heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "inline-block", width: 32, height: 1, background: "var(--accent)", opacity: 0.6 }} />
            4 roles · 2 active
            <span style={{ display: "inline-block", width: 32, height: 1, background: "var(--accent)", opacity: 0.6 }} />
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(64px,10vw,130px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--text)", animation: "heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
            Where I've<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>worked.</em>
          </h1>
          <p style={{ fontSize: 16, fontWeight: 300, color: "var(--text-secondary)", maxWidth: 480, margin: "28px auto 0", lineHeight: 1.75, animation: "heroFade 1s ease 0.75s both" }}>
            Volunteer engineering, co-op internships, and self-directed projects - building across ML, full-stack, and UX.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-tertiary)", animation: "heroFade 1s ease 1.1s both", zIndex: 1 }}>
          <div style={{ width: 1, height: 34, background: "linear-gradient(to bottom, var(--text-tertiary), transparent)", animation: "tickDrop 1.6s 1.4s infinite" }} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ROLES */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 48px", borderBottom: "1px solid var(--border)", overflow: "visible" }}>
        <Fox style={{ top: 80, left: "3%" }} />
        <Penguin style={{ bottom: 80, right: "3%" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8, fontFamily: "var(--serif)" }}>Experience</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", marginBottom: 64 }}>Roles.</h2>
          </Reveal>

          {ROLES.map((role, i) => (
            <Reveal key={role.org} delay={i * 0.07} grand>
              <div style={{ background: "var(--bg-2)", borderRadius: 24, padding: "48px", marginBottom: 16, borderLeft: `3px solid ${role.accent}` }}>
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
                      <span style={{ color: role.accent, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
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
        </div>
      </section>

      {/* EDUCATION + CERTS */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 48px 120px", overflow: "visible" }}>
        <Owl style={{ top: 80, right: "3%" }} />
        <Mouse style={{ bottom: 120, left: "3%" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8, fontFamily: "var(--serif)" }}>Education</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", marginBottom: 48 }}>Background.</h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div style={{ background: "var(--bg-2)", borderRadius: 24, padding: "36px 48px", marginBottom: 32, borderLeft: "3px solid var(--gold)" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", fontFamily: "var(--serif)", marginBottom: 6 }}>Bur Oak Secondary School</div>
              <div style={{ fontSize: 13, color: "var(--gold)", fontWeight: 500, marginBottom: 4 }}>Energy · 2023 – present · Markham, ON</div>
              <div style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300 }}>Software Engineering Workshop Club &nbsp;·&nbsp; Winds Ensemble &nbsp;·&nbsp; Math Club</div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 16 }}>Certifications</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CERTS.map(cert => (
                <div key={cert.name} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{cert.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 300, whiteSpace: "nowrap" }}>{cert.issuer} &nbsp;·&nbsp; {cert.date}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <div style={{ textAlign: "center", padding: "0 48px 80px", position: "relative", zIndex: 1, borderTop: "1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300, letterSpacing: "0.04em", paddingTop: 48 }}>
            黃德治 &nbsp;·&nbsp; Toronto, Ontario &nbsp;·&nbsp; 2026
          </p>
        </Reveal>
      </div>
    </div>
  )
}
