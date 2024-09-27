import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/ProductDetail'

// This is a mock product data. In a real application, you would fetch this data from an API.
const mockProduct = {
  id: 1,
  name: "Cap Ebbets Corduroy",
  price: 48.00,
  images: [
    "https://theme-spotlight-demo.myshopify.com/cdn/shop/products/Varsity-C_Cap-Corduroy-Yellow_Front_1080x_6fe179e1-b3f3-452b-a2d4-ee0c1d70e7c9.webp?v=1676406573&width=1946",
    "https://theme-spotlight-demo.myshopify.com/cdn/shop/products/Varsity-C_Cap-Corduroy-Yellow_Back_1080x_84d2dd15-2063-485f-b46a-a071d8e2b1ea.webp?v=1676406573&width=1946"
  ],
  description: "Made by the well-respected and renowned athletic garments company Ebbets Field Flannels. Hand-sewn from genuine wool baseball cloth. This cap is built to last a lifetime.",
  features: [
    "Made in the USA",
    "Genuine wool broadcloth, white felt \"Coursework C\" icon with combined embroidery",
    "Soft visor with green satin under visor",
    "Vintage hair cloth backed buckram crown",
    "Satin taping with cotton sweatband",
    "Black leather strap and black metal press closure"
  ],
  inStock: true
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  
  // In a real application, you would fetch the product data based on the id
  // For this example, we're using the mock data
  const product = mockProduct

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  )
}

export default ProductPage