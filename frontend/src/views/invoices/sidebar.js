import React from 'react'
import { Button } from '../../components/UI'
import Select from 'react-select'
import {
  useFlash,
  invoiceCreatedFlash,
  invoiceUpdatedFlash,
} from '../../components/Flash'
import { useHistory } from 'react-router-dom'
import { routes } from '../../routes'

const options = [
  { value: 'paid', label: 'Paid' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'past due', label: 'Past Due' },
  { value: 'hold', label: 'Hold' },
]

const Sidebar = ({ editing, invoice, setInvoice, submit }) => {
  const handleChange = selectedOption => {
    setInvoice('lvl.status', selectedOption.value)
  }

  const history = useHistory()
  const flash = useFlash()
  const handleSubmit = e => {
    e.preventDefault()
    submit(invoice).then(() => {
      flash.add(editing ? invoiceUpdatedFlash : invoiceCreatedFlash)
      if (!editing) {
        history.push(routes.INVOICES)
      }
    })
  }
  return (
    <>
      {/* <h2>Invoice settings</h2>
      <Select
        className="invoiced-select"
        classNamePrefix="invoiced"
        value={invoice.status}
        onChange={handleChange}
        options={options}
      />
      <div className="row">
        <div className="col">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>

          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
          />
        </div>
      </div> */}
      <Button primary full type="submit" onClick={handleSubmit}>
        {editing ? 'Save Invoice' : 'Create Invoice'}
      </Button>
    </>
  )
}

export default Sidebar
