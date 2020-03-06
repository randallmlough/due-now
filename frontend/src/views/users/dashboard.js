import React, { useState } from 'react'
import { Loader } from '../../components/UI/loaders'
import { useEffect } from 'react'
import { Link } from '../../components/UI'
import { routes } from '../../routes'

export default function Dashboard(props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeoutInstance = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timeoutInstance)
  })

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex-grow container mx-auto sm:px-4 py-10 animated fadeIn slower">
            <div className="flex flex-wrap -mx-4 mb-10">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-dark-500 uppercase font-bold text-xs">
                          Invoices paid
                        </h5>
                        <span className="font-semibold text-xl text-dark-800">
                          10
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 mt-4">
                      <span className="text-green-500 mr-2">
                        <i className="fas fa-arrow-up"></i> 3.48%
                      </span>
                      <span className="whitespace-no-wrap">
                        Since last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-dark-500 uppercase font-bold text-xs">
                          Invoices past due
                        </h5>
                        <span className="font-semibold text-xl text-dark-800">
                          5
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 mt-4">
                      <span className="text-red-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 3.48%
                      </span>
                      <span className="whitespace-no-wrap">
                        Since last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-dark-500 uppercase font-bold text-xs">
                          Contacts created
                        </h5>
                        <span className="font-semibold text-xl text-dark-800">
                          10
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 mt-4">
                      <span className="text-orange-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 1.10%
                      </span>
                      <span className="whitespace-no-wrap">
                        Since last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-dark-500 uppercase font-bold text-xs">
                          Revenue
                        </h5>
                        <span className="font-semibold text-xl text-dark-800">
                          $100,000
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 mt-4">
                      <span className="text-green-500 mr-2">
                        <i className="fas fa-arrow-up"></i> 12%
                      </span>
                      <span className="whitespace-no-wrap">
                        Since last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4">
                <div className="bg-white rounded shadow">
                  <div className="border-b border-gray-400">
                    <div className="flex justify-between px-6 -mb-px">
                      <h3 className="text-dark-300 py-4 font-normal text-lg">
                        Recent Activity
                      </h3>
                    </div>
                  </div>
                  <div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
