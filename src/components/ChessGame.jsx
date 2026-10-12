import { useCallback, useEffect, useRef, useState } from "react"
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"
import { playSound } from "./chessSounds"

// Jaden-bot: plays White, always opens 1.e4 and (after 1...e5) the Leonardis Variation 2.d3, then Stockfish takes over
const BOT_ELO = 1400 // Stockfish's own Elo scale (1320 to 3190); not the same as chess.com or Lichess ratings
const THINK_MS = 600
const ENGINE_URL = `${import.meta.env.BASE_URL}stockfish/stockfish-19-lite-single.js`

const toMove = uci => ({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] })

function statusOf(game, thinking, ready) {
  if (game.isCheckmate()) return game.turn() === "b" ? "Checkmate - Jaden-bot wins" : "Checkmate - you win!"
  if (game.isStalemate()) return "Stalemate - draw"
  if (game.isDraw()) return "Draw"
  if (!ready) return "Waking up the engine..."
  if (thinking || game.turn() === "w") return "Jaden-bot is thinking..."
  return game.inCheck() ? "Your move (Black) - you're in check" : "Your move (Black)"
}

export default function ChessGame({ onClose }) {
  const gameRef = useRef(new Chess())
  const workerRef = useRef(null)
  const botBusy = useRef(false)
  const [fen, setFen] = useState(gameRef.current.fen())
  const [ready, setReady] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [muted, setMuted] = useState(() => { try { return localStorage.getItem("chessMuted") === "1" } catch { return false } })
  const mutedRef = useRef(muted)
  mutedRef.current = muted
  const [closing, setClosing] = useState(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  // Play the closing animation first, then actually close
  const requestClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => onCloseRef.current(), 200)
  }, [])
  const [selected, setSelected] = useState(null) // square of the piece whose moves are shown

  const sync = () => setFen(gameRef.current.fen())

  // One sound per move, for the bot's and yours: tap, capture, check, or game over
  const sound = move => {
    if (mutedRef.current) return
    const g = gameRef.current
    playSound(g.isGameOver() ? "end" : g.inCheck() ? "check" : move?.captured ? "capture" : "move")
  }

  const playBot = useCallback(() => {
    const game = gameRef.current
    if (game.isGameOver() || game.turn() !== "w" || botBusy.current) return
    botBusy.current = true
    setThinking(true)
    const finish = uci => {
      try { sound(game.move(toMove(uci))) } catch { /* ignore a stale reply */ }
      botBusy.current = false
      setThinking(false)
      sync()
    }

    // Opening book: always 1.e4 and 2.d3, the Leonardis Variation
    const hist = game.history({ verbose: true }).map(m => m.from + m.to).join(",")
    if (hist === "") return setTimeout(() => finish("e2e4"), 450)
    // Whatever Black answers 1.e4 with, the second move is d3 (the Leonardis setup), as long as it is legal
    if (/^e2e4,[a-h][1-8][a-h][1-8]$/.test(hist) && game.moves({ verbose: true }).some(m => m.from === "d2" && m.to === "d3")) {
      return setTimeout(() => finish("d2d3"), 600)
    }

    const w = workerRef.current
    if (!w) { botBusy.current = false; setThinking(false); return }
    w.onmessage = e => {
      const line = typeof e.data === "string" ? e.data : ""
      const m = line.match(/^bestmove (\S+)/)
      if (m) finish(m[1])
    }
    w.postMessage(`position fen ${game.fen()}`)
    w.postMessage(`go movetime ${THINK_MS}`)
  }, [])

  // Start the engine, then let the bot make its first move
  useEffect(() => {
    const w = new Worker(ENGINE_URL)
    workerRef.current = w
    w.onmessage = e => {
      const line = typeof e.data === "string" ? e.data : ""
      if (line === "uciok") {
        w.postMessage("setoption name UCI_LimitStrength value true")
        w.postMessage(`setoption name UCI_Elo value ${Math.min(3190, Math.max(1320, BOT_ELO))}`)
        w.postMessage("isready")
      } else if (line === "readyok") {
        setReady(true)
      }
    }
    w.postMessage("uci")
    return () => { w.terminate(); workerRef.current = null }
  }, [])

  useEffect(() => { if (ready) playBot() }, [ready, playBot])

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") requestClose() }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev }
  }, [requestClose])

  const canMove = () => !thinking && !gameRef.current.isGameOver() && gameRef.current.turn() === "b"

  const tryMove = (from, to) => {
    const game = gameRef.current
    if (!to || !canMove()) return false
    try { sound(game.move({ from, to, promotion: "q" })) } catch { return false }
    setSelected(null)
    sync()
    setTimeout(playBot, 250)
    return true
  }

  const select = square => {
    const piece = gameRef.current.get(square)
    setSelected(canMove() && piece && piece.color === "b" ? square : null)
  }

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const ok = tryMove(sourceSquare, targetSquare)
    if (!ok) setSelected(null)
    return ok
  }

  // Click a piece to see its moves, then click a highlighted square to move there
  const onSquareClick = ({ square }) => {
    if (selected && legalTargets.some(m => m.to === square)) tryMove(selected, square)
    else select(square)
  }

  const newGame = () => {
    if (!mutedRef.current) playSound("start")
    gameRef.current = new Chess()
    botBusy.current = false
    setThinking(false)
    sync()
    setTimeout(playBot, 200)
  }

  const game = gameRef.current
  const over = game.isGameOver()
  const legalTargets = selected && canMove() ? game.moves({ square: selected, verbose: true }) : []
  const squareStyles = {}
  if (selected && legalTargets.length) {
    squareStyles[selected] = { backgroundColor: "rgba(20,22,28,0.16)" }
    for (const m of legalTargets) {
      // A dot on empty squares, a ring around pieces that can be captured
      squareStyles[m.to] = game.get(m.to)
        ? { background: "radial-gradient(circle, transparent 58%, rgba(20,22,28,0.35) 60%, rgba(20,22,28,0.35) 76%, transparent 78%)" }
        : { background: "radial-gradient(circle, rgba(20,22,28,0.32) 20%, transparent 22%)" }
    }
  }

  return (
    <div
      onClick={requestClose}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(20,22,28,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: closing ? "fadeOut 0.2s ease both" : "fadeIn 0.2s ease both" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: "min(94vw, 520px)", background: "var(--bg-2)", borderRadius: 18, padding: 20, boxShadow: "var(--shadow-lg)", border: "1px solid var(--border)", animation: closing ? "scaleOut 0.2s ease both" : "scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", lineHeight: 1.1 }}>Play Jaden-bot</div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300, marginTop: 6 }}>
              Plays my favourite opening (Leonardis Variation) at {BOT_ELO} elo 💛
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <button
              onClick={() => { const next = !muted; setMuted(next); try { localStorage.setItem("chessMuted", next ? "1" : "0") } catch { /* storage blocked */ } }}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              title={muted ? "Sound off" : "Sound on"}
              style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", padding: "4px 6px", display: "flex" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5L6 9H3v6h3l5 4V5z" />
                {muted ? <path d="M16 9l5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
              </svg>
            </button>
          <button onClick={requestClose} aria-label="Close" style={{ background: "none", border: "none", color: "var(--text-tertiary)", fontSize: 24, lineHeight: 1, cursor: "pointer", padding: "0 4px" }}>×</button>
          </div>
        </div>

        <Chessboard
          options={{
            position: fen,
            boardOrientation: "black",
            onPieceDrop: onDrop,
            // Wait a tick so the board finishes picking the piece up before the highlights re-render it
            onPieceDrag: ({ square }) => setTimeout(() => select(square), 0),
            onSquareClick,
            squareStyles,
            allowDragging: !thinking && !over && game.turn() === "b",
            animationDurationInMs: 150,
            dragActivationDistance: 0,
            lightSquareStyle: { backgroundColor: "#eceef2" },
            darkSquareStyle: { backgroundColor: "#9aa3b2" },
            boardStyle: { borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 20px rgba(20,22,28,0.18)" },
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, gap: 12 }}>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 400 }}>{statusOf(game, thinking, ready)}</div>
          <button
            onClick={newGame}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffffff", background: "var(--gold)", border: "1px solid var(--gold)", borderRadius: 6, padding: "8px 14px", cursor: "pointer", fontFamily: "var(--font)", whiteSpace: "nowrap" }}
          >New game</button>
        </div>

        <div style={{ fontSize: 10, color: "var(--text-tertiary)", fontWeight: 300, marginTop: 14, lineHeight: 1.6 }}>
          Powered by{" "}
          <a href="https://github.com/nmrugg/stockfish.js" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Stockfish.js</a>
          {" "}(GPLv3, <a href="/stockfish/COPYING.txt" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>license</a>),{" "}
          <a href="https://github.com/jhlywa/chess.js" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>chess.js</a>, and{" "}
          <a href="https://github.com/Clariity/react-chessboard" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>react-chessboard</a>.
        </div>
      </div>
    </div>
  )
}
