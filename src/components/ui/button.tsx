import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md font-semibold transition-colors duration-200'
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}