import React, { useState } from 'react'
import { X } from 'lucide-react'

interface SearchModalProps {
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Searching for:', searchQuery)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md sm:rounded-l-none hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchModal