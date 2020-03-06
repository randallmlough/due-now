import React from 'react'
import { Link } from '../../../components/UI'
import { routes } from '../../../routes'

export default function InvoicesTable({ children }) {
  const headers = React.Children.map(children, (child, i) => {
    if (child.type.name === 'Header') return child
  })

  const rows = React.Children.map(children, (child, i) => {
    if (child.type.name === 'Row') return child
  })

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {rows ? (
          <>{rows}</>
        ) : (
          <tr className="bg-white text-center">
            <td colSpan={4} className="px-5 py-20">
              <p className="text-gray-700 mb-5">
                You don't have any invoices yet. Create one!
              </p>
              <Link
                to={routes.INVOICES_NEW}
                primary
                button
                className="inline-block font-bold"
              >
                Create invoice
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
