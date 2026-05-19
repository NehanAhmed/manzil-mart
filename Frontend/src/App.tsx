import Navbar from "./components/navbar"
import { Route, Routes } from "react-router"
import Index from "./pages"
import { PromoBanner } from "./components/promo-banner"
import Products from "./pages/products"
import Signup from "./pages/signup"
import Login from "./pages/login"
import ApplyForVendor from "./pages/apply-for-vendor"
import OrdersPage from "./pages/orders"
import OrderDetailPage from "./pages/order-details"
import CheckoutPage from "./pages/checkout"
import ProductPage from "./pages/product-page"
import { AdminShell } from "./components/admin-shell"
import Dashboard from "./pages/dashboard"
import AdminProducts from "./pages/admin-products"
import AdminVendors from "./pages/admin-vendors"
import DeliveryPartners from "./pages/delivery-partners"


function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <PromoBanner textOne="Free shipping on orders over $50" textTwo="New arrivals every week" />
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login isVendor={false} />} />
      <Route path="/register" element={<Signup isVendor={false} />} />
      <Route path="/vendor/login" element={<Login isVendor={true} />} />
      <Route path="/vendor/register" element={<Signup isVendor={true} />} />
      <Route path="/" element={
        <MainLayout>
          <Index />
        </MainLayout>
      } />
      <Route path="/products" element={
        <MainLayout>
          <Products />
        </MainLayout>
      } />
      <Route path="/apply-for-vendor" element={
        <MainLayout>
          <ApplyForVendor />
        </MainLayout>
      } />
      <Route path="/orders" element={
        <MainLayout>
          <OrdersPage />
        </MainLayout>
      } />
      <Route path="/order/:id" element={
        <MainLayout>
          <OrderDetailPage />
        </MainLayout>
      } />
      <Route path="/checkout" element={
        <MainLayout>
          <CheckoutPage />
        </MainLayout>
      } />
      <Route path="/product/:id" element={
        <MainLayout>
          <ProductPage />
        </MainLayout>
      } />

      <Route path="/admin" element={<AdminShell />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="vendors" element={<AdminVendors />} />
        <Route path="orders" element={<OrdersPage isAdmin />} />
        <Route path="delivery" element={<DeliveryPartners />} />
      </Route>
    </Routes>

  )
}

export default App
