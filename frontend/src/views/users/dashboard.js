import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from '../../components/UI'
import { routes } from '../../routes'
import { getInvoicesAction } from '../../actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, isAfter, startOfMonth, endOfMonth } from 'date-fns'
import Pagination from '../../components/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dashboard = ({ getCurrentInvoices }) => {
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(
    format(startOfMonth(new Date()), 'MM/dd/yyyy')
  )
  const [endDate, setEndDate] = useState(
    format(endOfMonth(new Date()), 'MM/dd/yyyy')
  )

  const handleStartDateChange = date => {
    setStartDate(format(date, 'MM/dd/yyyy'))
  }

  const handleEndDateChange = date => {
    setEndDate(format(date, 'MM/dd/yyyy'))
  }

  const [recentActivity, setRecentActivity] = useState([])
  const [invoicesPaid, setInvoicesPaid] = useState(0)
  const [invoicesPastDue, setInvoicesPastDue] = useState(0)
  const [revenue, setRevenue] = useState(0)
  useEffect(() => {
    setLoading(true)
    setRecentActivity([])
    setInvoicesPaid(0)
    setInvoicesPastDue(0)
    setRevenue(0)
    getCurrentInvoices(`?start_date=${startDate}&end_date=${endDate}`)
      .then(invoices => {
        invoices.forEach(invoice => {
          setRecentActivity(prevActivity => prevActivity.concat(invoice))
          if (invoice.paid) {
            setInvoicesPaid(prevCount => prevCount + 1)
            setRevenue(prevTotal => prevTotal + invoice.total)
          } else if (isAfter(new Date(), new Date(invoice.dueDate))) {
            setInvoicesPastDue(prevCount => prevCount + 1)
          }
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [startDate, endDate])

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    pageLimit: 5,
    offset: 0,
  })

  const onPageChanged = data => {
    const { currentPage, totalPages, pageLimit, offset } = data
    setPagination({ currentPage, totalPages, pageLimit, offset })
  }

  const currentActivity = recentActivity.slice(
    pagination.offset,
    pagination.offset + pagination.pageLimit
  )

  return (
    <div className="flex-grow container mx-auto sm:px-4 py-10 animated fadeIn">
      <div className="flex mb-5">
        <label className="flex items-center px-2 py-1 border-2 border-gray-400 rounded cursor-pointer focus-within:bg-white focus-within:shadow focus-within:border-white text-gray-600 w-32">
          <FontAwesomeIcon icon="calendar" className="mr-2" />

          <DatePicker
            selected={new Date(startDate)}
            onChange={handleStartDateChange}
            className="bg-transparent cursor-pointer focus:outline-none text-base w-full"
          />
        </label>
        <span className="self-center text-xs font-semibold px-2 text-gray-500">
          to
        </span>
        <label className="flex items-center px-2 py-1 border-2 border-gray-400 rounded cursor-pointer focus-within:bg-white focus-within:shadow focus-within:border-white text-gray-600 w-32">
          <FontAwesomeIcon icon="calendar" className="mr-2" />

          <DatePicker
            selected={new Date(endDate)}
            onChange={handleEndDateChange}
            className="bg-transparent cursor-pointer focus:outline-none text-base w-full"
          />
        </label>
      </div>
      <div className="flex flex-wrap -mx-4 mb-10">
        <div className="w-full lg:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded xl:mb-0 shadow">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-dark-500 uppercase font-bold text-xs">
                    Invoices paid
                  </h5>
                  <span className="font-semibold text-xl text-dark-800">
                    {loading ? (
                      <FontAwesomeIcon
                        icon="circle-notch"
                        spin
                        className="text-primary-300 opacity-50"
                      />
                    ) : (
                      <>{invoicesPaid}</>
                    )}
                  </span>
                </div>
              </div>
              {/* <p className="text-sm text-dark-500 mt-4">
                      <span className="text-green-500 mr-2">
                        <i className="fas fa-arrow-up"></i> 3.48%
                      </span>
                      <span className="whitespace-no-wrap">
                        Since last month
                      </span>
                    </p> */}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded xl:mb-0 shadow">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-dark-500 uppercase font-bold text-xs">
                    Invoices past due
                  </h5>
                  <span className="font-semibold text-xl text-dark-800">
                    {loading ? (
                      <FontAwesomeIcon
                        icon="circle-notch"
                        spin
                        className="text-primary-300 opacity-50"
                      />
                    ) : (
                      <>{invoicesPastDue}</>
                    )}
                  </span>
                </div>
              </div>
              {/* <p className="text-sm text-dark-500 mt-4">
                      <span className="text-red-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 3.48%
                      </span>
                      <span className="whitespace-no-wrap">
                        Since last month
                      </span>
                    </p> */}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded xl:mb-0 shadow">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-dark-500 uppercase font-bold text-xs">
                    Revenue
                  </h5>
                  <span className="font-semibold text-xl text-dark-800">
                    {loading ? (
                      <FontAwesomeIcon
                        icon="circle-notch"
                        spin
                        className="text-primary-300 opacity-50"
                      />
                    ) : (
                      <>${Number(revenue).toFixed(2)}</>
                    )}
                  </span>
                </div>
              </div>
              {/* <p className="text-sm text-dark-500 mt-4">
                      <span className="text-green-500 mr-2">
                        <i className="fas fa-arrow-up"></i> 12%
                      </span>
                      <span className="whitespace-no-wrap">
                        Since last month
                      </span>
                    </p> */}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded xl:mb-0 shadow">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-dark-500 uppercase font-bold text-xs mb-2">
                    Create new invoice
                  </h5>
                  <Link to="/invoices/new" button primary small block>
                    New Invoice
                  </Link>
                </div>
              </div>
              {/* <p className="text-sm text-dark-500 mt-4">
                      <span className="text-orange-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 1.10%
                      </span>
                      <span className="whitespace-no-wrap">
                        Since last month
                      </span>
                    </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4">
          <div className="bg-white rounded shadow">
            {/* card header */}
            <div className="border-b border-gray-400">
              <div className="flex justify-between items-center px-6 -mb-px">
                <h3 className="text-dark-300 py-4 font-normal text-lg">
                  Recent Activity
                </h3>
                <Link to="/invoices">View all invoices</Link>
              </div>
            </div>
            {/* card body */}
            <div style={{ height: 'calc(75px * 5)' }}>
              {loading ? (
                <div className="flex h-full items-center justify-center text-6xl">
                  <FontAwesomeIcon
                    icon="circle-notch"
                    spin
                    className="text-primary-300 opacity-50"
                  />
                </div>
              ) : (
                <>
                  {recentActivity.length ? (
                    <ul className="flex flex-col">
                      {currentActivity.map((invoice, idx) => (
                        <li
                          key={idx}
                          className="border-b flex hover:bg-gray-100 items-center py-1"
                        >
                          <Link
                            to={`/invoices/${invoice.id}`}
                            dark
                            className="px-6 py-3 block w-full"
                          >
                            <div className="flex items-center">
                              <div>
                                <div>
                                  <span className="mr-2">
                                    {invoice.invoiceNumber}
                                  </span>
                                  <span className="mr-2">
                                    {new Date(invoice.dueDate).toDateString()}
                                  </span>
                                  <span>
                                    {isAfter(
                                      new Date(),
                                      new Date(invoice.dueDate)
                                    ) &&
                                      !invoice.paid && (
                                        <small className="text-orange-500">
                                          overdue
                                        </small>
                                      )}
                                  </span>
                                </div>
                                <div>
                                  <span className="mr-2">
                                    {invoice.recipient.name}
                                  </span>
                                  <span className="mr-2">
                                    {invoice.recipient.emailAddress}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-auto">
                                {invoice.paid ? (
                                  <span className="text-success-400 ml-auto">
                                    Paid
                                  </span>
                                ) : (
                                  <span className="text-danger-400 ml-auto">
                                    Unpaid
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center px-6 py-4">
                      <div className="py-8">
                        <div className="mb-4">
                          <svg
                            className="inline-block fill-current text-dark-100 h-16 w-16"
                            viewBox="0 0 384 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m288 256h-192v64h192zm89-151-97.9-98c-4.5-4.5-10.6-7-17-7h-6.1v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31v-136h-200c-13.3 0-24 10.7-24 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24v-328h-136c-13.2 0-24-10.8-24-24zm-160-64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8zm256 304c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8zm0-200v96c0 8.84-7.16 16-16 16h-224c-8.84 0-16-7.16-16-16v-96c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16z" />
                          </svg>
                        </div>
                        <p className="text-2xl text-dark-700 font-medium mb-4">
                          No invoices yet
                        </p>
                        <p className="text-dark max-w-xs mx-auto mb-6">
                          Lets create your first invoice!
                        </p>
                        <div>
                          <Link to={routes.INVOICES} button primary>
                            View Invoices
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {/* card footer */}
            <div className="flex justify-center py-3">
              <Pagination
                totalRecords={recentActivity.length}
                pageLimit={5}
                pageNeighbors={1}
                prevNextOnly
                onPageChanged={onPageChanged}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  getCurrentInvoices: query => dispatch(getInvoicesAction(query)),
})

export default connect(null, mapDispatchToProps)(Dashboard)
