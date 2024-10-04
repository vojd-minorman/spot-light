import React from 'react'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center">
        <img src="/footer-logo.png" alt="Brand Logo" className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
        <h2 className="text-base sm:text-lg font-semibold mb-2">A brand that strives to inspire and push creative culture forward.</h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 max-w-2xl">
          We approach our work with the mentality that every product made is a learning experience to
          improve our craft. We are practitioners and purveyors of creative culture and are inspired
          by its various forms from art, design, fashion, music, film, food, and more.
        </p>
        <div className="flex space-x-4 mb-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">TikTok</span>
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">YouTube</span>
            <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <select className="border rounded px-2 py-1 text-sm mb-4 sm:mb-0">
          <option>United States (USD $)</option>
        </select>
        <div className="flex flex-wrap justify-center sm:justify-end space-x-2 space-y-2">
          <img src="/visa.png" alt="Visa" className="h-6 sm:h-8" />
          <img src="/mastercard.png" alt="Mastercard" className="h-6 sm:h-8" />
          <img src="/amex.webp" alt="American Express" className="h-6 sm:h-8" />
          <img src="/paypal.png" alt="PayPal" className="h-6 sm:h-8" />
          <img src="/diners.png" alt="Diners Club" className="h-6 sm:h-8" />
          <img src="/discover.png" alt="Discover" className="h-6 sm:h-8" />
        </div>
      </div>
    </footer>
  )
}

export default Footer