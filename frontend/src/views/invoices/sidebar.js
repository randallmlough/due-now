import React, { useEffect, useState } from 'react'
import { Button, Icon, Link } from '../../components/UI'
import Select from 'react-select'
import {
  useFlash,
  invoiceCreatedFlash,
  invoiceUpdatedFlash,
  invoiceDeletedFlash,
} from '../../components/Flash'
import { useHistory } from 'react-router-dom'
import { routes } from '../../routes'
import { get } from 'object-path-immutable'

const options = [
  { value: 'paid', label: 'Paid' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'past due', label: 'Past Due' },
  { value: 'hold', label: 'Hold' },
]

const validateForm = invoice => {
  let errors
  if (get(invoice, 'invoiceNumber') === '') {
    errors = { ...errors, invoiceNumber: 'invoice number is required' }
  }
  if (get(invoice, 'recipient.name') === '') {
    errors = { ...errors, recipientName: 'recipient name is required' }
  }
  return errors
}
const Sidebar = ({ editing, invoice, setInvoice, submit, deleteInvoice }) => {
  const [isDisabled, setIsDisabled] = useState(false)

  const handleChange = selectedOption => {
    setInvoice('lvl.status', selectedOption.value)
  }

  const errors = validateForm(invoice)
  useEffect(() => {
    setIsDisabled(Boolean(errors))
  }, [Boolean(errors)])

  const [showErrors, setShowErrors] = useState(false)
  const history = useHistory()
  const flash = useFlash()

  const handleSubmit = e => {
    e.preventDefault()
    if (isDisabled) {
      setShowErrors(true)
      return
    }
    submit(invoice)
      .then(() => {
        flash.add(editing ? invoiceUpdatedFlash : invoiceCreatedFlash)
        if (!editing) {
          history.push(routes.INVOICES)
        }
      })
      .catch(resp => {
        Object.values(resp.errors).forEach(error => {
          flash.add({
            type: 'danger',
            title: 'Uh oh!',
            body: error,
          })
        })
      })
  }

  const handleDeleteInvoice = e => {
    e.preventDefault()
    deleteInvoice(invoice.id)
      .then(() => {
        flash.add(invoiceDeletedFlash(invoice.id))
        history.push('/invoices')
      })
      .catch(e => console.error(e))
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
      <div className="mb-8">
        <Link
          to={`/invoice/${invoice.uuid}`}
          button
          gray
          dShade={800}
          hShade={700}
          className="mb-3 block w-full text-center"
        >
          <Icon icon="eye" className="mr-3" />
          Preview
        </Link>
        <Button primary full type="submit" onClick={handleSubmit}>
          {editing ? (
            <>
              <Icon icon="save" className="mr-3" />
              Save Invoice
            </>
          ) : (
            <>
              <Icon icon="file" className="mr-3" />
              Create Invoice
            </>
          )}
        </Button>
      </div>
      <hr className="bg-gray-500 h-px mb-4 opacity-25 w-full" />
      {editing && (
        <Button danger full outline onClick={handleDeleteInvoice}>
          <Icon icon="trash" className="mr-3" />
          Delete invoice
        </Button>
      )}
      {showErrors && (
        <ul className="mt-5">
          {errors &&
            Object.values(errors).map((error, i) => (
              <li key={i} className="mb-2 text-danger font-semibold">
                {error}
              </li>
            ))}
        </ul>
      )}
    </>
  )
}

export default Sidebar
