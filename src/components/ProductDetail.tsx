import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
  id: number
  images: string[]
  properties: string[]
  title: string
  regularPrice: string
}

interface ProductDetailProps {
  id: string | undefined
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is missing')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.get<Product>(`/api/products/${id}`)
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img src={product.images[0]} alt={product.title} className="h-48 w-full object-cover md:w-48" />
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="mt-2 text-gray-600">{product.regularPrice}</p>
          <ul className="mt-4 list-disc list-inside">
            {product.properties.map((prop, index) => (
              <li key={index}>{prop}</li>
            ))}
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail