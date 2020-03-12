import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { getInvoicesAction } from '../../actions'
import { Link } from '../UI'

const Search = props => {
  const { search, resource } = props

  const searchContainer = useRef(null)
  const [showResults, setShowResults] = useState(false)
  useEffect(() => {
    const dropdownListener = e => {
      if (
        !searchContainer.current ||
        searchContainer.current.contains(e.target)
      ) {
        setShowResults(true)
      } else {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', dropdownListener)
    return () => {
      document.removeEventListener('mousedown', dropdownListener)
    }
  }, [searchContainer])

  const [query, setQuery] = useState('')
  const handleOnChange = e => {
    e.preventDefault()
    setQuery(e.target.value)
  }
  const [results, setResults] = useState([])
  useEffect(() => {
    if (query !== '') {
      search(`?search=${query}&limit=5`)
        .then(resp => {
          setResults(resp)
        })
        .catch(e => {
          console.error('ERROR', e)
        })
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div className="relative lg:mr-5" ref={searchContainer}>
      <div>
        <input
          className="appearance-none bg-dark-700 block border-transparent duration-100 ease-in-out focus:bg-white focus:border-primary-500 focus:outline-0 focus:outline-none focus:text-gray-600 leading-normal pl-10 placeholder placeholder-gray-600 pr-4 py-2 rounded-lg text-gray-600 text-sm transition-colors w-full"
          type="text"
          placeholder="Search for an invoice"
          autoComplete="off"
          spellCheck="false"
          aria-autocomplete="list"
          aria-expanded="false"
          aria-label="search input"
          value={query}
          onChange={handleOnChange}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
          <svg
            className="fill-current pointer-events-none text-gray-600 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
        </div>
      </div>
      {showResults && (
        <div
          className="-mx-32 absolute bg-white mt-8 overflow-hidden rounded shadow-lg top-0 z-50"
          style={{ width: 340 }}
        >
          {query.length > 0 &&
            (results.length > 0 ? (
              <>
                <ul>
                  {results.map((result, idx) => (
                    <li key={idx}>
                      <Link to={`/invoices/${result.id}`}>
                        <ul className="border-b hover:bg-gray-200 p-4">
                          <li>
                            <span className="font-bold mr-1 text-gray-600">
                              Invoice #
                            </span>
                            {result.invoiceNumber}
                          </li>
                          <li>
                            <span className="font-bold mr-1 text-gray-600">
                              Client Name
                            </span>
                            {result.recipient.name}
                          </li>
                          <li>
                            <span className="font-bold mr-1 text-gray-600">
                              Client Email
                            </span>
                            {result.recipient.emailAddress}
                          </li>
                        </ul>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div>
                  <Link
                    to={`/${resource}?search=${query}`}
                    primary
                    className="w-full text-center block bg-gray-200 py-3"
                  >
                    View more results
                  </Link>
                </div>
              </>
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-600 font-bold">No results</p>
                <p className="text-gray-500">Try something else</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

// const mapStateToProps = state => ({
//   results,
// })

const mapDispatchToProps = dispatch => ({
  search: query => dispatch(getInvoicesAction(query)),
})

export default connect(null, mapDispatchToProps)(Search)
