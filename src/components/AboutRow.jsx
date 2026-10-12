import { useRowReveal, revealStyle } from "./useRowReveal"

const GAP = 12

const ChefHat = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 14.5V19h10v-4.5" />
    <path d="M7 14.5a3.6 3.6 0 0 1-1-6.9A4.5 4.5 0 0 1 12 4.5a4.5 4.5 0 0 1 6 3.1 3.6 3.6 0 0 1-1 6.9" />
    <path d="M7 17h10" />
  </svg>
)

const CERTS = [
  { name: "IBM Machine Learning Professional Certificate", sub: "IBM • Dec 2025", logo: "/logos/ibm.png" },
  { name: "Google AI Professional Certificate", sub: "Google • Apr 2026", logo: "/logos/google.png" },
  { name: "10/10 Chef", sub: "Self-Certified", icon: <ChefHat /> },
]

const Icon = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const PASSIONS = [
  {
    label: "Food", value: "McDonald's Large French Vanilla Cloud Iced Coffee", href: "https://www.mcdonalds.com/ca/en-ca/product/french-vanilla-cloud-iced-coffee-large.html",
    icon: <Icon><path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8z" /><path d="M16 10h2a2 2 0 0 1 0 4h-2M8 3v2M11 3v2M14 3v2" /></Icon>,
  },
  {
    label: "Literature", value: "Dutch Renaissance", href: "https://en.wikipedia.org/wiki/Dutch_Renaissance_and_Golden_Age_literature",
    icon: <Icon><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z" /><path d="M4 19a2 2 0 0 1 2-2h13" /></Icon>,
  },
  {
    label: "Procrastinating", value: "Chemistry 😔",
    icon: <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>,
  },
]

const card = { background: "var(--bg-2)", borderRadius: 16, padding: 28, borderTop: "2px solid var(--gold)", boxSizing: "border-box" }
const label = { fontSize: 10, color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 16 }
const sub = { fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 300, marginBottom: 2 }

export default function AboutRow() {
  const { ref, shown } = useRowReveal()
  const cell = i => {
    const rv = revealStyle(shown, i)
    return { ...card, ...rv.style, transition: rv.transition }
  }

  return (
    <div ref={ref} className="one-col" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: GAP, alignItems: "stretch" }}>
      <div style={{ ...cell(0), display: "flex", flexDirection: "column" }}>
        <div style={label}>What I'm working on</div>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(56px, 8vw, 112px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.04em", color: "var(--text)" }}>
            School 🫩
          </div>
        </div>
      </div>

      <div style={cell(1)}>
        <div style={label}>Certifications</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {CERTS.map(c => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, background: "white", border: "1px solid var(--border)", borderRadius: 6, padding: 4, flexShrink: 0, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {c.logo ? <img src={c.logo} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : c.icon}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.35, marginBottom: 3 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 300 }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={cell(2)}>
        <div style={label}>Passions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {PASSIONS.map(p => (
            <div key={p.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              {p.icon}
              <div>
                <div style={sub}>{p.label}</div>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer" className="passion-link" style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.3, textDecoration: "none" }}>
                    {p.value.slice(0, p.value.lastIndexOf(" ") + 1)}
                    {/* The last word and the up-right arrow stay together, so the arrow never wraps onto its own line */}
                    <span style={{ whiteSpace: "nowrap" }}>
                      {p.value.slice(p.value.lastIndexOf(" ") + 1)}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: 3, opacity: 0.8 }}>
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </a>
                ) : (
                  <div style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px", lineHeight: 1.3 }}>{p.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
