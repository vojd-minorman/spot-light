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
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleDecreaseQuantity(item.id)} className="p-1 border rounded">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.id)} className="p-1 border rounded">
                    <Plus size={16} />
                  </button>
                  <button onClick={() => setItemToDelete(item.id)} className="p-1 border rounded text-red-500">
                    <Trash2 size={16} />
                  </button>
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
      <div className="mt-16 text-center space-y-4">
        <p className="text-sm">A brand that strives to inspire and push creative culture forward.</p>
        <p className="text-xs text-gray-600">
          We approach our work with the mentality that every product made is a learning experience to
          improve our craft. We are practitioners and purveyors of creative culture and are inspired
          by its various forms from art, design, fashion, music, film, food, and more.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <select className="border rounded px-2 py-1">
          <option>United States (CAD $)</option>
        </select>
        <div className="flex space-x-2">
          <span className="w-8 h-5 bg-gray-200 rounded"></span>
          <span className="w-8 h-5 bg-gray-200 rounded"></span>
          <span className="w-8 h-5 bg-gray-200 rounded"></span>
          <span className="w-8 h-5 bg-gray-200 rounded"></span>
          <span className="w-8 h-5 bg-gray-200 rounded"></span>
        </div>
      </div>
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