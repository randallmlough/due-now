import React, { useState, useEffect } from 'react'
import { Loader } from '../../components/UI/loaders'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getInvoicesAction, updateInvoiceAction } from '../../actions'
import { InvoicesTable, Row, Col, Header } from '../../components/UI/Table'
import { Link as RouterLink } from 'react-router-dom'
import { Pill, Link } from '../../components/UI'
import { routes } from '../../routes'
import { VisibilityFilters } from '../../actions/invoice_actions'
import { formatRelative } from 'date-fns'
import { useFlash } from '../../components/Flash'
import Pagination from '../../components/Pagination'

const filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PAID: 'SHOW_PAID',
  SHOW_UNPAID: 'SHOW_UNPAID',
}

function InvoicesView({ invoices, updateInvoice, getInvoices }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!invoices.length) {
      getInvoices()
    }
    setLoading(false)
  }, [])

  const [filter, setFilter] = useState(null)
  const handleFilterOption = e => {
    e.preventDefault()
    switch (e.target.value) {
      case 'ALL':
        return setFilter(null)
      case 'PAID':
        return setFilter(filters.SHOW_PAID)
      case 'UNPAID':
        return setFilter(filters.SHOW_UNPAID)
    }
  }

  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const handleRecordsPerPageOption = e => {
    e.preventDefault()
    switch (e.target.value) {
      case '5':
        return setRecordsPerPage(5)
      case '10':
        return setRecordsPerPage(10)
      case '20':
        return setRecordsPerPage(20)
    }
  }

  const flash = useFlash()
  const handlePrivateStatus = invoice => {
    return e => {
      e.preventDefault()
      updateInvoice({
        id: invoice.id,
        private: e.target.value === 'true' ? true : false,
      })
        .then(() => {
          flash.add({
            type: 'success',
            body: 'Invoice has been updated',
          })
        })
        .catch(() => {
          flash.add({
            type: 'danger',
            title: 'Uh oh!',
            body: "Something went wrong and we couldn't update",
          })
        })
    }
  }

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

  let totalInvoices = invoices.length

  const [search, setSearch] = useState('')
  const handleSearch = e => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const filteredSearch = invoices.filter(invoice => {
    if (search.length > 0) {
      return invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase())
    } else {
      return invoice
    }
  })

  const filteredInvoices = filteredSearch.filter(invoice => {
    switch (filter) {
      case filters.SHOW_PAID:
        return invoice.paid
      case filters.SHOW_UNPAID:
        return !invoice.paid
      default:
        return invoice
    }
  })
  totalInvoices = filteredInvoices.length

  const currentInvoices = filteredInvoices.slice(
    pagination.offset,
    pagination.offset + pagination.pageLimit
  )

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto sm:px-4">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:justify-between bg-blue-900 px-4 py-6 ">
                  <h2 className="text-2xl font-semibold leading-tight text-white">
                    Invoices
                  </h2>
                  <div className="w-1/5">
                    <input
                      className="focus:outline-none w-full h-10 px-3 rounded focus:shadow-lg border-2 border-transparent focus:border-primary-500 focus:outline-none "
                      type="search"
                      placeholder="Search for invoice..."
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col justify-between items-center py-3 px-4 bg-gray-200 border-b">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">Showing</span>
                    <div className="relative mx-1">
                      <select
                        className="appearance-none h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-1 px-2 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue="10"
                        onChange={handleRecordsPerPageOption}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">invoices</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-1">filter</span>
                    <span className="text-sm text-gray-600 mr-1">status</span>
                    <div className="relative">
                      <select
                        className="appearance-none h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-1 px-2 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue="ALL"
                        onChange={handleFilterOption}
                      >
                        <option value="ALL">All</option>
                        <option value="PAID">Paid</option>
                        <option value="UNPAID">Unpaid</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <InvoicesTable>
                  <Header>Invoice #</Header>
                  <Header>Created At</Header>
                  <Header>Due At</Header>
                  <Header>Private</Header>
                  <Header>Status</Header>
                  {invoices.length ? (
                    currentInvoices.length ? (
                      currentInvoices.map(invoice => {
                        // debugger
                        return (
                          <Row key={invoice.id}>
                            <Col>
                              <Link to={`${routes.INVOICES}/${invoice.id}`}>
                                {invoice.invoiceNumber}
                              </Link>
                            </Col>
                            <Col>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {formatRelative(
                                  new Date(invoice.createdAt),
                                  new Date()
                                )}
                              </p>
                            </Col>
                            <Col>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {invoice.dueDate &&
                                  formatRelative(
                                    new Date(invoice.dueDate),
                                    new Date()
                                  )}
                              </p>
                            </Col>
                            <Col>
                              <div className="relative">
                                <select
                                  className="appearance-none bg-white cursor-pointer focus:outline-none h-full w-full leading-tight pr-8 py-2 text-gray-700"
                                  value={invoice.private.toString()}
                                  onChange={handlePrivateStatus(invoice)}
                                >
                                  <option value="true">True</option>
                                  <option value="false">False</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                  </svg>
                                </div>
                              </div>
                            </Col>
                            <Col>
                              {invoice.paid ? (
                                <Pill success>Paid</Pill>
                              ) : (
                                <Pill danger>Unpaid</Pill>
                              )}
                            </Col>
                          </Row>
                        )
                      })
                    ) : (
                      <Row>
                        <Col colSpan={5}>
                          <div className="px-5 py-20 text-center">
                            <p className="text-gray-700 mb-5">
                              No results returned. Please try something
                              different.
                            </p>
                          </div>
                        </Col>
                      </Row>
                    )
                  ) : (
                    <Row>
                      <Col colSpan={5}>
                        <div className="px-5 py-20 text-center">
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
                        </div>
                      </Col>
                    </Row>
                  )}
                </InvoicesTable>
                {recordsPerPage > 0 && (
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <Pagination
                      totalRecords={totalInvoices}
                      pageLimit={recordsPerPage}
                      pageNeighbors={1}
                      onPageChanged={onPageChanged}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <RouterLink
            to={routes.INVOICES_NEW}
            className="bg-primary-500 block bottom-0 fixed font-bold leading-none mb-5 mr-5 p-5 right-0 rounded-full shadow-lg text-2xl text-white"
          >
            +
          </RouterLink>
        </div>
      )}
    </>
  )
}

InvoicesView.propTypes = {
  submit: PropTypes.func.isRequired,
}

const getVisibleInvoices = (invoices, filter = VisibilityFilters.SHOW_ALL) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return invoices
    case VisibilityFilters.SHOW_PAID:
      return invoices.filter(i => i.paid)
    case VisibilityFilters.SHOW_UNPAID:
      return invoices.filter(i => !i.paid)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state = []) => ({
  invoices: getVisibleInvoices(
    Object.values(state.entities.invoices),
    state.entities.visibilityFilter
  ),
})

const mapDispatchToProps = dispatch => ({
  // setFilter: filter => dispatch(setVisibilityFilter(filter)),
  updateInvoice: invoice => dispatch(updateInvoiceAction(invoice)),
  getInvoices: async () => await dispatch(getInvoicesAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesView)
