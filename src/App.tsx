import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import { CartProvider } from './contexts/CartContext'

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main className="container mx-auto px-4 py-8 ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App