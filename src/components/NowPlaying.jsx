import { useEffect, useRef, useState } from "react"

// Spotify track ID (the part after /track/ in the share link, before the ?)
const SPOTIFY_TRACK_ID = "4y3VBhJPEztyRmNxfK3tZ5"
const API_SRC = "https://open.spotify.com/embed/iframe-api/v1"
const HIDE_KEY = "nowPlayingHidden"

export default function NowPlaying() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(() => {
    try { return localStorage.getItem(HIDE_KEY) === "1" } catch { return false }
  })
  const mountRef = useRef(null)
  const controllerRef = useRef(null)
  const createdRef = useRef(false)
  const wantPlayRef = useRef(false)
  const startedRef = useRef(false)

  // First play starts the track, later plays resume from where it was paused
  const startOrResume = (controller) => {
    if (startedRef.current) controller.resume()
    else { startedRef.current = true; controller.play() }
  }

  // Preload the player on page start (paused) so opening is instant
  useEffect(() => {
    if (createdRef.current || !mountRef.current) return
    createdRef.current = true
    const slot = document.createElement("div")
    mountRef.current.appendChild(slot)

    const build = (IFrameAPI) => {
      IFrameAPI.createController(
        slot,
        { uri: `spotify:track:${SPOTIFY_TRACK_ID}`, width: "100%", height: 80 },
        (controller) => {
          controllerRef.current = controller
          // If the user opened the widget before the player finished loading, start as soon as it is ready
          controller.addListener("ready", () => { if (wantPlayRef.current) startOrResume(controller) })
        }
      )
    }

    if (window.SpotifyIframeApi) {
      build(window.SpotifyIframeApi)
    } else {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        window.SpotifyIframeApi = IFrameAPI
        build(IFrameAPI)
      }
      if (!document.querySelector(`script[src="${API_SRC}"]`)) {
        const s = document.createElement("script")
        s.src = API_SRC
        s.async = true
        document.body.appendChild(s)
      }
    }
  }, [])

  // Play on open, pause on close, so the player is never hidden while playing
  const toggle = () => {
    const next = !open
    wantPlayRef.current = next
    if (next) { if (controllerRef.current) startOrResume(controllerRef.current) }
    else controllerRef.current?.pause()
    setOpen(next)
  }

  // Remove the widget for good (remembered in this browser)
  const hideForever = () => {
    controllerRef.current?.pause()
    try { localStorage.setItem(HIDE_KEY, "1") } catch { /* storage blocked, hides for this visit only */ }
    setHidden(true)
  }

  if (hidden) return null

  return (
    <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, maxWidth: "calc(100vw - 40px)", pointerEvents: "none" }}>
      <div
        aria-hidden={!open}
        style={{
          width: 320, maxWidth: "100%", background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 14, padding: 12, boxShadow: "0 8px 28px rgba(20,22,28,0.18)", transformOrigin: "bottom right",
          opacity: open ? 1 : 0, transform: open ? "scale(1)" : "scale(0.95)", visibility: open ? "visible" : "hidden", pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease, visibility 0.25s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, margin: "0 0 10px 2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", fontWeight: 400, whiteSpace: "nowrap" }}>
            Currently obsessed with
            <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1 }}>💛</span>
          </div>
          <button
            onClick={hideForever}
            aria-label="Hide music player"
            title="Hide"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, padding: 0, background: "transparent", border: "none", color: "var(--text-tertiary)", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)" }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text-tertiary)" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" />
            </svg>
          </button>
        </div>
        <div ref={mountRef} style={{ borderRadius: 12, overflow: "hidden", minHeight: 80 }} />
      </div>
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close music player" : "Open music player"}
        style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-2)", border: "1px solid var(--border)", color: open ? "var(--gold-text)" : "var(--text-secondary)", cursor: "pointer", boxShadow: "0 4px 18px rgba(20,22,28,0.14)", pointerEvents: "auto", transition: "color 0.2s, border-color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold-text)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>
    </div>
  )
}
