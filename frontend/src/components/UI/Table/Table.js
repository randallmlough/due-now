import React from 'react'

export default function InvoicesTable({ children }) {
  const headers = React.Children.map(children, (child, i) => {
    if (child.type.displayName === 'Header') return child
  })

  const rows = React.Children.map(children, (child, i) => {
    if (child.type.displayName === 'Row') return child
  })

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
