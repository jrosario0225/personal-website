
import { useState, useEffect } from "react"
import Scene from "./components/Scene/Scene.jsx"


function App() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Scene />
      <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#c4a882",
        opacity: fadeOut ? 0: 1,
        transition: "opacity 1.2s ease",
        pointerEvents: fadeOut ? "none" : "auto",
        zIndex: 999
      }}
      />
    </>
  )
}
export default App
