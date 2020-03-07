import React, { useState, useEffect } from 'react'
import { Loader } from '../../components/UI/loaders'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getInvoicesAction } from '../../actions'
import { InvoicesTable, Row, Col, Header } from '../../components/UI/Table'
import { Pill, Link } from '../../components/UI'
import { routes } from '../../routes'
import { VisibilityFilters } from '../../actions/invoice_actions'
import { setVisibilityFilter } from '../../actions'

function InvoicesView({ invoices, getInvoices, setFilter }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!invoices.length) {
      getInvoices()
    }
    setLoading(false)
  }, [])

  const handleFilterOption = e => {
    e.preventDefault()
    switch (e.target.value) {
      case 'ALL':
        setFilter(VisibilityFilters.SHOW_ALL)
        break
      case 'PAID':
        setFilter(VisibilityFilters.SHOW_PAID)
        break
      case 'UNPAID':
        setFilter(VisibilityFilters.SHOW_UNPAID)
        break
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto sm:px-4">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select
                    className="appearance-none h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              <div>
                <Link to={routes.INVOICES_NEW} button primary small>
                  Create invoice
                </Link>
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <InvoicesTable>
                  <Header>Invoice #</Header>
                  <Header>Created At</Header>
                  <Header>Private</Header>
                  <Header>Status</Header>
                  {invoices.length ? (
                    invoices.map(invoice => (
                      <Row key={invoice.id}>
                        <Col>
                          <Link to={`${routes.INVOICES}/${invoice.id}`}>
                            {invoice.invoice_number}
                          </Link>
                        </Col>
                        <Col>
                          <p className="text-gray-900 whitespace-no-wrap">
                            {invoice.created_at}
                          </p>
                        </Col>
                        <Col>
                          <p className="text-gray-900 whitespace-no-wrap">
                            {invoice.private.toString()}
                          </p>
                        </Col>
                        <Col>
                          {invoice.paid ? (
                            <Pill success>Paid</Pill>
                          ) : (
                            <Pill danger>Unpaid</Pill>
                          )}
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <Row>
                      <Col colSpan={4}>
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
                {invoices.length > 0 && (
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                        Prev
                      </button>
                      <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
  setFilter: filter => dispatch(setVisibilityFilter(filter)),
  getInvoices: async () => await dispatch(getInvoicesAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesView)
