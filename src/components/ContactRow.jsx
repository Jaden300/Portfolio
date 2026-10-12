import { useState } from "react"
import { GitHubIcon, LinkedInIcon, ArrowUpRight } from "./Icons"
import { useRowReveal, revealStyle } from "./useRowReveal"

const Svg = ({ children }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)
const CopyIcon = () => <Svg><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></Svg>
const MailIcon = () => <Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg>
const Check = () => <Svg><path d="M5 12l5 5 9-10" /></Svg>

const EMAIL = "jn.wong.enterprise@gmail.com"
const GAP = 12

const card = { background: "var(--bg-2)", borderRadius: 16, padding: 28, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14 }
const label = { fontSize: 10, color: "var(--text-tertiary)", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.1em" }
const value = { fontFamily: "var(--serif)", fontSize: 17, fontWeight: 600, color: "var(--text)", lineHeight: 1.4, flex: 1, wordBreak: "break-word" }

export default function ContactRow() {
  const { ref, shown } = useRowReveal()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const cell = (i, accent) => {
    const rv = revealStyle(shown, i)
    return { ...card, borderTop: `2px solid ${accent}`, ...rv.style, transition: rv.transition }
  }

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: GAP, alignItems: "stretch" }}>
      <div style={cell(0, "var(--text)")}>
        <div style={label}>Email</div>
        <div style={value}>{EMAIL}</div>
        <button onClick={copyEmail} className={`contact-btn ${copied ? "contact-btn--copied" : "contact-btn--dark"}`}>
          {copied ? <Check /> : <CopyIcon />}{copied ? "Copied" : "Copy email"}
        </button>
        <a href={`mailto:${EMAIL}`} className="contact-btn contact-btn--dark"><MailIcon />Send email<ArrowUpRight /></a>
      </div>

      <div style={cell(1, "#0077B5")}>
        <div style={label}>LinkedIn</div>
        <div style={value}>jaden-wong09</div>
        <a href="https://www.linkedin.com/in/jaden-wong09/" target="_blank" rel="noreferrer" className="contact-btn contact-btn--blue"><LinkedInIcon />Visit profile<ArrowUpRight /></a>
      </div>

      <div style={cell(2, "var(--text-tertiary)")}>
        <div style={label}>GitHub</div>
        <div style={value}>Jaden300</div>
        <a href="https://github.com/Jaden300" target="_blank" rel="noreferrer" className="contact-btn contact-btn--dark"><GitHubIcon />View profile<ArrowUpRight /></a>
      </div>
    </div>
  )
}
