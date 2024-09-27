import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart } from 'lucide-react'
import SearchModal from './SearchModal'
import CartDropdown from './CartDropdown'
import { useCart } from '../contexts/CartContext'

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold uppercase tracking-wider">
        Spot Light
      </Link>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="text-gray-600 hover:text-gray-900"
        >
          <Search className="h-6 w-6" />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </button>
          {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
        </div>
      </div>
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </header>
  )
}

export default Header