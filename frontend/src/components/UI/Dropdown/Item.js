import React from 'react'
export default function Item({ children, ...props }) {
  return (
    <div className="dropdown-item" {...props}>
      {children}
    </div>
  )
}
