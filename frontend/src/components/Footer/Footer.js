import React from 'react'
import { Link } from '../UI'
export const Footer = () => {
  return (
    <div className="bg-white w-full">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between items-center text-sm">
          <div className="text-center md:text-left py-3 md:py-4 border-b md:border-b-0">
            <Link to="/" className="text-gray-dark mr-4">
              Home
            </Link>
          </div>
          <div className="md:flex md:flex-row-reverse items-center py-4">
            <div className="text-gray text-center md:mr-4">© 2020 Invoiced</div>
          </div>
        </div>
      </div>
    </div>
  )
}
