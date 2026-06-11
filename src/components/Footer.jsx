import { GitHubIcon, LinkedInIcon } from "./Icons"

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 48px 20px", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        {[
          ["GitHub", "https://github.com/Jaden300"],
          ["LinkedIn", "https://www.linkedin.com/in/jaden-wong09/"],
        ].map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}
          >
            {label === "GitHub" && <GitHubIcon />}
            {label === "LinkedIn" && <LinkedInIcon />}
            {label}
          </a>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "rgba(237,234,226,0.18)", fontWeight: 300, letterSpacing: "0.08em" }}>Code with Love.</div>
    </footer>
  )
}
