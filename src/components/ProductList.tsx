import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Product } from '../types'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get<Product[]>('https://api-ecommerce-express-e5kr.onrender.com/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>
  }

  if (products.length === 0) {
    return <div className="text-center py-10">No products found.</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="bg-gray-100 rounded-lg overflow-hidden">
          <div className="aspect-w-1 aspect-h-1">
            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-900">{product.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{product.regularPrice}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductList