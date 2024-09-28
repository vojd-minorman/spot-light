import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

interface ProductDetailProps {
  product: {
    id: number
    title: string
    regularPrice: string
    images: string[]
    description: string
    properties: string[]
    inStock: boolean
  }
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleQuantityChange = (amount: number) => {
    setQuantity(Math.max(1, quantity + amount))
  }

  const handleImageSwap = () => {
    setMainImage(prevImage => 
      prevImage === product.images[0] ? product.images[1] : product.images[0]
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: parseFloat(product.regularPrice.replace('$', '')),
      quantity: quantity,
      imageUrl: product.images[0]
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src={mainImage} alt={product.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
          <div className="mt-4">
            <button
              onClick={handleImageSwap}
              className="w-20 h-20 border-2 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img 
                src={mainImage === product.images[0] ? product.images[1] : product.images[0]} 
                alt={`${product.title} thumbnail`} 
                className="w-full h-full object-cover" 
              />
            </button>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-semibold mb-6">{product.regularPrice} CAD</p>
          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity</span>
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 border rounded-l-md"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 border-t border-b">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 border rounded-r-md"
            >
              <Plus size={16} />
            </button>
          </div>
          {/* {product.inStock ? ( */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-yellow-400 text-black py-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors mb-4"
            >
              Buy it now
            </button>
          {/* ) : ( */}
            <button className="w-full bg-gray-300 text-gray-600 py-3 rounded-md font-semibold cursor-not-allowed mb-4">
              Sold out
            </button>
          {/* )} */}
          <p className="text-sm text-gray-600 mb-6">
            This is a demonstration store. You can purchase products like this from Coursework
          </p>
          <p className="mb-6">{product.description}</p>
          <ul className="list-disc list-inside space-y-2">
            {product.properties.map((property, index) => (
              <li key={index}>{property}</li>
            ))}
          </ul>
          <button className="mt-6 text-sm text-gray-600 hover:text-gray-900">Share</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail