import React from 'react'
import { StaticNavbar } from '../../Navbar/Navbar'
import { Link } from 'react-router-dom'

function parseTo(to) {
  let parser = document.createElement('a')
  parser.href = to
  return parser
}

function isInternal(to) {
  // If it's a relative url such as '/path', 'path' and does not contain a protocol we can assume it is internal.

  if (to.indexOf('://') === -1) return true

  const toLocation = parseTo(to)
  return window.location.hostname === toLocation.hostname
}

const SplitHero = props => {
  const {
    menu,
    children,
    heroClassName,
    primaryCTA = { to: '', text: 'Get started' },
    secondaryCTA = { to: '', text: 'Live demo' },
    bgImage = 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
  } = props

  return (
    <div
      className={`relative bg-white overflow-hidden ${
        heroClassName ? heroClassName : ''
      }`}
    >
      <div className="max-w-screen-xl mx-auto ">
        <div className="relative z-40 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <StaticNavbar menu={menu} />

          <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              {children}
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  {!primaryCTA.to.startsWith('http') ? (
                    <Link
                      to={primaryCTA.to}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    >
                      {primaryCTA.text}
                    </Link>
                  ) : (
                    <a
                      href={primaryCTA.to}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    >
                      {primaryCTA.text}
                    </a>
                  )}
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  {!secondaryCTA.to.startsWith('http') ? (
                    <Link
                      to={secondaryCTA.to}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-primary-700 border-primary-100 hover:bg-primary-500 hover:text-white hover:bg-primary-50 focus:outline-none focus:shadow-outline focus:border-primary-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    >
                      {secondaryCTA.text}
                    </Link>
                  ) : (
                    <a
                      href={secondaryCTA.to}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-primary-700 border-primary-100 hover:bg-primary-500 hover:text-white hover:bg-primary-50 focus:outline-none focus:shadow-outline focus:border-primary-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    >
                      {secondaryCTA.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg
        className="hidden lg:block absolute right-0 inset-y-0 h-full w-56 text-white transform -translate-x-1/2 z-30"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ left: '50%' }}
      >
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={bgImage}
          alt=""
        />
      </div>
    </div>
  )
}

export default SplitHero
