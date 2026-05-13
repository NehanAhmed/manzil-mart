import { Button } from "@/components/ui/button"
import Navbar from "./components/navbar"
import { Route, Routes } from "react-router"
import Index from "./pages"
import { PromoBanner } from "./components/promo-banner"
import Products from "./pages/products"
import Signup from "./pages/signup"
import Login from "./pages/login"
export function App() {
  return (
    <main>
      <PromoBanner textOne="Free shipping on orders over $50" textTwo="New arrivals every week" />
      <Navbar />
      <div className="max-w-7xl mx-auto">

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signup" element={<Signup isVendor={false} />} />
        <Route path="/login" element={<Login isVendor={false} />} />
      </Routes>
      </div>
    </main>
  )
}

export default App
