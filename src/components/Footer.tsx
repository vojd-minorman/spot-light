// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          SPOT LIGHT
        </Link>
        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-md py-1 px-2 pr-8"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <FaTimes size={18} />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsSearchOpen(true)}>
              <FaSearch size={24} />
            </button>
          )}
          <Link to="/cart">
            <FaShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;