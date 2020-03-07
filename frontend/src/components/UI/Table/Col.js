import React from 'react'

export default function Col({ children, ...props }) {
  return (
    <td
      className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      {...props}
    >
      {children}
    </td>
  )
}
Col.displayName = 'Col'
