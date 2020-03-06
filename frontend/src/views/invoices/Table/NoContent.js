import React from 'react'
import { routes } from '../../../routes'

export default function NoContent(props) {
  return (
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
  )
}
