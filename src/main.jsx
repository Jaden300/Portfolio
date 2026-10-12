import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import "./index.css"
import Home from "./pages/Home"
import NowPlaying from "./components/NowPlaying"

function Shell() {
  return (
    <>
      <Routes>
        {/* One page: every URL, including old links to deleted pages, shows Home */}
        <Route path="*" element={<Home />} />
      </Routes>
      <NowPlaying />
      <Analytics />
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  </React.StrictMode>
)
