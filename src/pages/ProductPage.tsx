import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductDetail from '../components/ProductDetail'

interface Product {
  id: number
  title: string
  regularPrice: string
  images: string[]
  description: string
  properties: string[]
  inStock: boolean
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get<Product>(`https://api-ecommerce-express-e5kr.onrender.com/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Failed to load product. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <div className="text-center py-10">Loading product...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>
  }

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>
  }

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  )
}

export default ProductPage