import Reveal from "../components/Reveal"
import PageBanner from "../components/PageBanner"
import { AccuracyGauge } from "../components/Charts"
import { Dog, Sheep, Bunny } from "../components/Critters"

const PROJECTS = [
  {
    name: "myojam",
    year: "2024 – present",
    status: "Active",
    statusColor: "#10B981",
    url: "https://myojam.com",
    github: "https://github.com/Jaden300/myojam",
    accent: "#f5e040",
    summary: "Open-source surface EMG gesture classification platform — 84.85% cross-subject accuracy on Ninapro DB5. Full-stack system spanning a React web app, FastAPI backend, PyQt6 desktop app, and physical Arduino hardware integration.",
    bullets: [
      "84.85% cross-subject accuracy — tested on subjects never seen during training (Leave-One-Subject-Out CV)",
      "Full signal pipeline: Butterworth bandpass filter, 64-feature extraction (MAV/RMS/ZC/WL), Random Forest inference at <5ms",
      "8 interactive browser demos including signal playground, confusion matrix explorer, and Scratch-like EMG block coding",
      "11 published educational articles, 3 lesson plans, and the ELEVATE international EMG competition",
    ],
    metrics: [["84.85%", "Accuracy"], ["<5ms", "Inference"], ["16ch", "EMG input"], ["MIT", "License"]],
    tags: ["Python", "React", "FastAPI", "scikit-learn", "PyQt6", "Three.js", "Arduino"],
    gauge: true,
  },
  {
    name: "MyMurry",
    year: "2026 – present",
    status: "Active",
    statusColor: "#10B981",
    url: "https://mymurry.com",
    github: null,
    accent: "#A855F7",
    summary: "Full-stack AI-powered study platform. Users upload notes, GPT-4o sections them into key concepts, then users free-recall everything they remember - AI scores coverage 0-100 and surfaces missed points with a point-by-point breakdown.",
    bullets: [
      "21+ REST API endpoints across Next.js App Router - note CRUD, yap session analysis, Google Calendar/Tasks proxy, TOTP MFA recovery, and public browse",
      "9 PostgreSQL models via Prisma ORM — User, NoteSet, Section, YapSession, SectionProgress, Task, NoteSetHeart, RecoveryCode, Feedback",
      "Supabase auth with TOTP MFA, Google OAuth 2.0 with silent token refresh, and 2FA recovery codes (SHA-256 hashed)",
      "Custom i18n with no external library — 700+ translation strings across English, French, and Spanish; Zustand Pomodoro timer persisted across navigation",
    ],
    metrics: [["21+", "API endpoints"], ["9", "DB models"], ["3", "Languages (i18n)"], ["GPT-4o", "Core AI"]],
    tags: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "GPT-4o", "Supabase", "Vercel"],
    gauge: false,
  },
  {
    name: "Quant-Trading",
    year: "2025 – present",
    status: "Active",
    statusColor: "#10B981",
    url: "https://github.com/Jaden300/Quant-Trading",
    github: "https://github.com/Jaden300/Quant-Trading",
    accent: "#10B981",
    summary: "Python quantitative trading research framework — 23 strategies each with a bar-by-bar backtesting engine and multi-parameter grid-search optimizer. 5 promoted to production with live S&P 500 scanners and TradingView Pine Scripts.",
    bullets: [
      "Custom scoring formula: score = mean_sharpe - 0.5*std_sharpe + 4*(win_rate/100) — penalizes cross-ticker inconsistency, weights capital safety over raw Sharpe",
      "~2,140 parameter combinations backtested per strategy across 10 large-cap tickers over a 5.3-year daily bar history (2021-2026)",
      "Kalman filter crossover strategy built from scratch in NumPy — dual recursive Bayesian estimators with no signal-processing library dependency",
      "Live unified S&P 500 scanner downloads 730 days of OHLCV data for ~491 tickers and outputs ranked signals by confidence score",
    ],
    metrics: [["23", "Strategies"], ["5", "Production"], ["~491", "Tickers scanned"], ["0.95+", "R²"]],
    tags: ["Python", "NumPy", "pandas", "yfinance", "scikit-learn", "Pine Script v6"],
    gauge: false,
  },
]

export default function Work() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>
      <PageBanner
        label="Selected work"
        title="What I've"
        accent="built."
        sub="Three flagship projects - ML systems, full-stack platforms, and quantitative research. All documented, all open."
      />

      <section style={{ padding: "80px 48px 120px", position: "relative", overflow: "visible" }}>
        <Dog style={{ top: 60, right: "3%" }} />
        <Sheep style={{ bottom: 180, left: "3%" }} />
        <Bunny style={{ bottom: 60, right: "6%" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} grand>
              <div style={{ background: "var(--bg-2)", borderRadius: 24, overflow: "hidden", borderLeft: `3px solid ${p.accent}` }}>
                <div style={{ padding: "48px" }}>
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: p.statusColor, background: `${p.statusColor}18`, border: `1px solid ${p.statusColor}35`, borderRadius: 100, padding: "3px 12px" }}>{p.status}</span>
                        <span style={{ fontSize: 11, color: "var(--text-tertiary)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 12px", fontWeight: 300 }}>{p.year}</span>
                      </div>
                      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1px", marginBottom: 10 }}>{p.name}</h2>
                      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, fontWeight: 300, maxWidth: 580 }}>{p.summary}</p>
                    </div>
                    {p.gauge && (
                      <div style={{ flexShrink: 0 }}>
                        <AccuracyGauge pct={84.85} size={120} />
                      </div>
                    )}
                  </div>

                  {/* Bullets */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {p.bullets.map((b, j) => (
                      <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span style={{ color: p.accent, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>→</span>
                        <span style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75 }}>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 28 }}>
                    {p.metrics.map(([v, l]) => (
                      <div key={l} style={{ background: "var(--bg)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: p.accent, fontFamily: "var(--serif)", letterSpacing: "-0.5px", marginBottom: 2 }}>{v}</div>
                        <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags + links */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ fontSize: 11, color: "var(--text-tertiary)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 12px", fontWeight: 300 }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      {p.github && p.github !== p.url && (
                        <a href={p.github} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500, textDecoration: "none", letterSpacing: "0.06em" }}
                          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                          onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}
                        >GitHub ↗</a>
                      )}
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: p.accent, fontWeight: 600, textDecoration: "none", letterSpacing: "0.06em" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      >{p.url.includes("github.com") ? "View repo ↗" : "Visit site ↗"}</a>
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
