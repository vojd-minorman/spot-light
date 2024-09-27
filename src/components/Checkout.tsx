import React, { useState } from 'react'
import { useCart, CartItem } from '../contexts/CartContext'

const Checkout: React.FC = () => {
  const { cartItems } = useCart()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    nameOnCard: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // You can calculate shipping based on your business logic
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <div className="mb-4">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email or mobile phone number"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Email me with news and offers</span>
              </label>
            </div>

            <h2 className="text-2xl font-bold mb-4">Delivery</h2>
            <div className="mb-4">
              <select className="w-full p-2 border rounded">
                <option>United States</option>
              </select>
            </div>
            <div className="flex mb-4 space-x-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name (optional)"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex mb-4 space-x-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-1/3 p-2 border rounded"
                required
              />
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-1/3 p-2 border rounded"
                required
              >
                <option value="">State</option>
                {/* Add state options here */}
              </select>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="ZIP code"
                className="w-1/3 p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Save this information for next time</span>
              </label>
            </div>

            <h2 className="text-2xl font-bold mb-4">Shipping method</h2>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <p>Enter your shipping address to view available shipping methods.</p>
            </div>

            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <p className="mb-4 text-sm text-gray-600">All transactions are secure and encrypted.</p>
            <div className="mb-4 border rounded p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Credit card</span>
                <span className="bg-yellow-400 text-xs px-2 py-1 rounded">⚡</span>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Card number"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex mb-4 space-x-4">
                <input
                  type="text"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  placeholder="Expiration date (MM / YY)"
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="securityCode"
                  value={formData.securityCode}
                  onChange={handleInputChange}
                  placeholder="Security code"
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  placeholder="Name on card"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Use shipping address as billing address</span>
                </label>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition-colors">
              Pay now
            </button>
          </form>
        </div>

        <div className="md:w-1/3 mt-8 md:mt-0">
          <div className="bg-gray-50 p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Order summary</h2>
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    {item.quantity > 1 && (
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                  <span className="ml-4">{item.name}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                {/* <span>{shipping === 0 ? 'Enter shipping address' : `$${shipping.toFixed(2)}`}</span> */}
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>CAD ${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout