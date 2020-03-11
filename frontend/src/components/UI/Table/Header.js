import React from 'react'

export default function Header({ children }) {
  return (
    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
      {children}
    </th>
  )
}
Header.displayName = 'Header'
