import { Button } from "@/components/ui/button"
import Navbar from "./components/navbar"
import { Route, Routes } from "react-router"
import Index from "./pages"

export function App() {
  return (
    <main>
      <Navbar />
      <div className="max-w-7xl mx-auto">

      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      </div>
    </main>
  )
}

export default App
