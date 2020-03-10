import React from 'react'
import dayjs from 'dayjs'
import InvoiceItems from './invoice_items'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

export default function InvoiceForm({ invoice, setInvoice }) {
  const handleChange = key => {
    return e => setInvoice(key, e.target.value)
  }
  const handleDateChange = key => {
    return date => {
      setInvoice(key, date)
    }
  }
  return (
    <div className="p-10">
      <div className="mb-10">
        <div className="row mb-8">
          <div className="col md:w-1/2">
            <h1 className="text-2xl font-semibold text-dark-500 leading-tight mb-2">
              Invoice
            </h1>
            <textarea
              name="notes"
              className="w-full border border-gray-200 px-5 py-3"
              id=""
              rows="3"
              placeholder="notes (optional)"
              value={invoice.notes}
              onChange={handleChange('notes')}
            ></textarea>
          </div>
          <div className="col md:w-1/2">
            <div className="md:flex md:items-center">
              <div className="md:w-8/12">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Invoice No:
                </label>
              </div>
              <div className="md:w-4/12">
                <input
                  className="appearance-none border-b-2 border-transparent hover:border-primary-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary-300 text-right"
                  type="text"
                  placeholder="####"
                  value={invoice.invoiceNumber}
                  onChange={handleChange('invoiceNumber')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-8/12">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Invoice Date:
                </label>
              </div>
              <div className="md:w-4/12">
                <DatePicker
                  selected={new Date(invoice.invoiceDate)}
                  onChange={handleDateChange('invoiceDate')}
                />
                {/* <input
                  className="appearance-none border-b-2 border-transparent hover:border-primary-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary-300 text-right"
                  type="text"
                  
                  value={dayjs()
                    .format('MM/DD/YYYY')
                    .toString()}
                  onChange={handleChange('invoiceDate')}
                /> */}
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-8/12">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Due Date:
                </label>
              </div>
              <div className="md:w-4/12">
                <DatePicker
                  selected={new Date(invoice.dueDate)}
                  onChange={handleDateChange('dueDate')}
                />
                {/* <input
                  className="appearance-none border-b-2 border-transparent hover:border-primary-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary-300 text-right"
                  type="text"
                  value={dayjs()
                    .format('MM/DD/YYYY')
                    .toString()}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-8">
        <div className="col md:w-1/2">
          <h5 className="font-bold text-blue-400 leading-tight mb-4">
            Bill From
          </h5>
          <div className="mb-4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500"
              type="text"
              value={invoice.from.name}
              onChange={handleChange('from.name')}
              placeholder="From"
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500"
              type="text"
              value={invoice.from.emailAddress}
              onChange={handleChange('from.emailAddress')}
              placeholder="email address"
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500"
              type="text"
              value={invoice.from.phoneNumber}
              onChange={handleChange('from.phoneNumber')}
              placeholder="phone number"
            />
          </div>
        </div>
        <div className="col md:w-1/2">
          <h5 className="font-bold text-purple-400 leading-tight mb-4">
            Bill To
          </h5>
          <div className="mb-4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500"
              type="text"
              value={invoice.recipient.name}
              onChange={handleChange('recipient.name')}
              placeholder="From"
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500"
              type="text"
              value={invoice.recipient.emailAddress}
              onChange={handleChange('recipient.emailAddress')}
              placeholder="email address"
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500"
              type="text"
              value={invoice.recipient.phoneNumber}
              onChange={handleChange('recipient.phoneNumber')}
              placeholder="phone number"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <InvoiceItems
            invoice={invoice}
            setInvoice={setInvoice}
          ></InvoiceItems>
        </div>
      </div>
    </div>
  )
}
