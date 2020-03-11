import React, { useEffect } from 'react'

const InvoiceItem = ({ item, setInvoice, idx }) => {
  useEffect(() => {
    setItem(
      'total',
      (isNaN(item.qty) ? 0 : item.qty) * (isNaN(item.rate) ? 0 : item.rate)
    )
  }, [item.qty, item.rate])

  const handleChange = key => {
    return e => {
      if (key === 'description') {
        setItem(key, e.target.value)
      } else {
        setItem(key, parseFloat(e.target.value))
      }
    }
  }

  const setItem = (key, value) =>
    setInvoice('invoiceItems.' + idx + '.' + key, value)

  return (
    <tr>
      <td className="border px-4 py-2 odd:bg-gray-200">
        <input
          type="text"
          className="border border-transparent focus:border-blue-200 focus:outline-none px-2"
          value={item.description}
          name="description"
          onChange={handleChange('description')}
        />
      </td>
      <td className="border px-4 py-2 odd:bg-gray-200">
        <input
          type="number"
          className="border border-transparent focus:border-blue-200 focus:outline-none px-2"
          value={isNaN(item.qty) ? '' : item.qty}
          name="qty"
          onChange={handleChange('qty')}
        />
      </td>
      <td className="border px-4 py-2 odd:bg-gray-200">
        <input
          type="number"
          className="border border-transparent focus:border-blue-200 focus:outline-none px-2"
          value={isNaN(item.rate) ? '' : item.rate}
          name="rate"
          onChange={handleChange('rate')}
        />
      </td>
      <td className="border px-4 py-2 odd:bg-gray-200">
        <div className="px-2 text-right">$ {item.total}</div>
      </td>
    </tr>
  )
}

export default InvoiceItem
