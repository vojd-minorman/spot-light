import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/ProductDetail'

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail id={id} />
    </div>
  )
}

export default ProductPage