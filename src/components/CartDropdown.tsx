import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

interface CartDropdownProps {
  onClose: () => void
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { cartItems } = useCart()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-2">
              <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover mr-2" />
              <span>{item.name}</span>
            </div>
          ))
        )}
      </div>
      <div className="border-t p-4">
        <Link
          to="/cart"
          className="block w-full text-center px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          View Cart ({totalItems})
        </Link>
        <Link
          to="/checkout"
          className="block w-full text-center px-4 py-2 mt-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default CartDropdown