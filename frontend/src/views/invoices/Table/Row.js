import React from 'react'

export default function Row({ children, ...props }) {
  return <tr {...props}>{children}</tr>
}
