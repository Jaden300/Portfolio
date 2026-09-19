import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import "./index.css"
import Home       from "./pages/Home"
import About      from "./pages/About"
import Work       from "./pages/Work"
import Hackathons from "./pages/Hackathons"
import Contact    from "./pages/Contact"
import Experience from "./pages/Experience"
import Navbar   from "./components/Navbar"
import Footer   from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

function Shell() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/projects"   element={<Work />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
      <Footer />
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