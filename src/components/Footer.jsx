export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 48px", background: "var(--bg)", display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
      {[
        ["GitHub", "https://github.com/Jaden300"],
        ["LinkedIn", "https://www.linkedin.com/in/jaden-wong09/"],
      ].map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}
        >{label}</a>
      ))}
    </footer>
  )
}