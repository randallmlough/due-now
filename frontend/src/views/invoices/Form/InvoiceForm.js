import React from 'react'
import InvoiceItems from './invoice_items'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { Icon } from '../../../components/UI'

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
              <div className="md:w-3/5">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Invoice No
                </label>
              </div>
              <div className="md:w-2/5">
                <label className="flex items-center px-2 py-1 border-b-2 border-transparent hover:border-primary-200 cursor-pointer focus-within:bg-white focus-within:shadow focus-within:border-primary-300 text-gray-600 w-32">
                  <Icon icon="hashtag" className="mr-2" />
                  <input
                    className="appearance-none w-full text-gray-700 leading-tight focus:outline-none text-right cursor-pointer"
                    type="text"
                    placeholder="####"
                    value={invoice.invoiceNumber}
                    onChange={handleChange('invoiceNumber')}
                  />
                </label>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-3/5">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Invoice Date
                </label>
              </div>
              <div className="md:w-2/5">
                <label className="flex items-center px-2 py-1 border-b-2 border-transparent hover:border-primary-200 cursor-pointer focus-within:bg-white focus-within:shadow focus-within:border-primary-300 text-gray-600 w-32">
                  <Icon icon="calendar" className="mr-2" />
                  <DatePicker
                    selected={new Date(invoice.invoiceDate)}
                    onChange={handleDateChange('invoiceDate')}
                    className="appearance-none w-full text-gray-700 leading-tight focus:outline-none text-right cursor-pointer"
                  />
                </label>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-3/5">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Due Date
                </label>
              </div>
              <div className="md:w-2/5">
                <label className="flex items-center px-2 py-1 border-b-2 border-transparent hover:border-primary-200 cursor-pointer focus-within:bg-white focus-within:shadow focus-within:border-primary-300 text-gray-600 w-32">
                  <Icon icon="calendar" className="mr-2" />
                  <DatePicker
                    selected={new Date(invoice.dueDate)}
                    onChange={handleDateChange('dueDate')}
                    className="appearance-none w-full text-gray-700 leading-tight focus:outline-none text-right cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-8">
        <div className="col md:w-1/2">
          <h5 className="font-bold text-blue-400 leading-tight mb-4">
            Invoice From
          </h5>
          <div className="mb-4">
            <label className="appearance-none bg-gray-200 block border-2 border-gray-200 flex focus-within:bg-white focus-within:border-primary-500 focus:bg-white focus:border-primary-500 items-center leading-tight px-3 py-2 rounded text-gray-700">
              <Icon icon="user" className="mr-2 text-gray-600" />
              <input
                className="bg-transparent flex-grow focus:outline-none"
                type="text"
                value={invoice.from.name}
                onChange={handleChange('from.name')}
                placeholder="From name"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="appearance-none bg-gray-200 block border-2 border-gray-200 flex focus-within:bg-white focus-within:border-primary-500 focus:bg-white focus:border-primary-500 items-center leading-tight px-3 py-2 rounded text-gray-700">
              <Icon icon="envelope" className="mr-2 text-gray-600" />
              <input
                className="bg-transparent flex-grow focus:outline-none"
                type="text"
                value={invoice.from.emailAddress}
                onChange={handleChange('from.emailAddress')}
                placeholder="email address"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="appearance-none bg-gray-200 block border-2 border-gray-200 flex focus-within:bg-white focus-within:border-primary-500 focus:bg-white focus:border-primary-500 items-center leading-tight px-3 py-2 rounded text-gray-700">
              <Icon icon="phone" className="mr-2 text-gray-600" />
              <input
                className="bg-transparent flex-grow focus:outline-none"
                type="text"
                value={invoice.from.phoneNumber}
                onChange={handleChange('from.phoneNumber')}
                placeholder="phone number"
              />
            </label>
          </div>
        </div>
        <div className="col md:w-1/2">
          <h5 className="font-bold text-purple-400 leading-tight mb-4">
            Invoice To
          </h5>
          <div className="mb-4">
            <label className="appearance-none bg-gray-200 block border-2 border-gray-200 flex focus-within:bg-white focus-within:border-primary-500 focus:bg-white focus:border-primary-500 items-center leading-tight px-3 py-2 rounded text-gray-700">
              <Icon icon="user" className="mr-2 text-gray-600" />
              <input
                className="bg-transparent flex-grow focus:outline-none"
                type="text"
                value={invoice.recipient.name}
                onChange={handleChange('recipient.name')}
                placeholder="From"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="appearance-none bg-gray-200 block border-2 border-gray-200 flex focus-within:bg-white focus-within:border-primary-500 focus:bg-white focus:border-primary-500 items-center leading-tight px-3 py-2 rounded text-gray-700">
              <Icon icon="envelope" className="mr-2 text-gray-600" />
              <input
                className="bg-transparent flex-grow focus:outline-none"
                type="text"
                value={invoice.recipient.emailAddress}
                onChange={handleChange('recipient.emailAddress')}
                placeholder="email address"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="appearance-none bg-gray-200 block border-2 border-gray-200 flex focus-within:bg-white focus-within:border-primary-500 focus:bg-white focus:border-primary-500 items-center leading-tight px-3 py-2 rounded text-gray-700">
              <Icon icon="phone" className="mr-2 text-gray-600" />
              <input
                className="bg-transparent flex-grow focus:outline-none"
                type="text"
                value={invoice.recipient.phoneNumber}
                onChange={handleChange('recipient.phoneNumber')}
                placeholder="phone number"
              />
            </label>
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
