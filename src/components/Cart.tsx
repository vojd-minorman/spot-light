import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { useCart, CartItem } from '../contexts/CartContext'

interface DeleteConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to remove this item from your cart?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)

const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart()
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id)
    if (item) {
      addToCart({ ...item, quantity: 1 })
    }
  }

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id)
    if (item && item.quantity > 1) {
      addToCart({ ...item, quantity: -1 })
    } else {
      setItemToDelete(id)
    }
  }

  const handleDeleteConfirm = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete)
      setItemToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setItemToDelete(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your cart</h1>
        <Link to="/" className="text-blue-600 hover:underline">Continue shopping</Link>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600 sm:hidden">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:space-x-2">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleDecreaseQuantity(item.id)} className="p-1 border rounded">
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.id)} className="p-1 border rounded">
                      <Plus size={16} />
                    </button>
                  </div>
                  <button onClick={() => setItemToDelete(item.id)} className="p-1 border rounded text-red-500">
                    <Trash2 size={16} />
                  </button>
                  <span className="w-20 text-right hidden sm:inline">${item.price.toFixed(2)}</span>
                  <span className="w-20 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4 lg:w-1/2 lg:ml-auto">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span>${subtotal.toFixed(2)} CAD</span>
            </div>
            <p className="text-sm text-gray-600">Taxes and shipping calculated at checkout</p>
            <Link 
              to="/checkout" 
              className="block w-full bg-yellow-400 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors text-center"
            >
              Check out
            </Link>
          </div>
        </>
      )}
      
      {itemToDelete !== null && (
        <DeleteConfirmation
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  )
}

export default Cart