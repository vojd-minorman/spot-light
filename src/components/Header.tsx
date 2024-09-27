import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart } from 'lucide-react'

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold uppercase tracking-wider">
        Spot Light
      </Link>
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </form>
      <Link to="/cart" className="text-gray-600 hover:text-gray-900">
        <ShoppingCart className="h-6 w-6" />
      </Link>
    </header>
  )
}

export default Header