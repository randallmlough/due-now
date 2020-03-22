import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useOffMenuClick } from './useNavbar'
import { classList } from '../UI/helpers'
import { Link, Icon } from '../UI'
import MenuBtn from './MenuBtn'
import { DefaultMenu } from './Menu'
import { useSession } from '../Session'
import Search from './Search'
import UserMenu from './UserMenu'
import { CSSTransition } from 'react-transition-group'
import { Link as ReactLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobile, setMobileState] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (document.body.clientWidth <= 1024) setMobileState(true)
      else setMobileState(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const [session] = useSession()

  const nav = useRef()
  useOffMenuClick(nav, () => setOpen(false))

  return (
    <>
      <header className="bg-dark-500">
        <div className="container mx-auto ">
          <div
            className="navbar flex items-center flex-wrap px-6 py-4"
            ref={nav}
          >
            <MenuBtn open={open} setOpen={setOpen} />
            <div className="block mr-3 lg:hidden"></div>
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <Link to="/" white small hShade={200}>
                <span className="font-semibold text-xl tracking-tight">
                  Invoiced
                </span>
              </Link>
            </div>
            {session ? (
              <DefaultMenu open={open} setOpen={setOpen} mobile={mobile}>
                <div className="text-2xl w-full lg:flex-grow">
                  <NavLink
                    to="/"
                    className="block mt-4 mr-4 text-white hover:text-primary-200"
                  >
                    <span className="inline-block text-center w-10 mr-2">
                      <Icon icon="home" className="text-primary-200" />
                    </span>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/invoices"
                    className="block mt-4 mr-4 text-white hover:text-primary-200"
                  >
                    <span className="inline-block text-center w-10 mr-2">
                      <Icon
                        icon="file-invoice-dollar"
                        className="text-primary-200"
                      />
                    </span>
                    Invoices
                  </NavLink>
                </div>
              </DefaultMenu>
            ) : (
              <DefaultMenu open={open} setOpen={setOpen} mobile={mobile}>
                <div className="text-2xl lg:text-sm w-full lg:flex-grow">
                  <NavLink
                    to="/"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
                  >
                    Home
                  </NavLink>
                </div>
              </DefaultMenu>
            )}
            <div className="ml-auto">
              {session ? (
                <div className="flex items-center">
                  <Search resource={'invoices'} />
                  <UserMenu />
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    white
                    outline
                    small
                    className="ml-3 lg:mt-0"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    button
                    small
                    success
                    className="ml-3 lg:mt-0"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {open && (
        <div
          className={classList(
            'bg-black absolute top-0 right-0 left-0 bottom-0 z-30 animated',
            open ? 'block fadeIn-50 ' : 'hidden opacity-0'
          )}
          onClick={() => setOpen(!open)}
        ></div>
      )}
    </>
  )
}

export const StaticNavbar = props => {
  const { menu } = props
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <ReactLink
                to="/"
                className="flex font-black items-center text-gray-700 text-xl"
              >
                <span className="bg-primary-500 flex font-serif h-8 items-center justify-center mr-2 rounded sm:h-10 text-3xl text-white w-10">
                  I
                </span>
                invoiced
              </ReactLink>
              <div className="-mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4">
            {Object.values(menu).map((menuItem, idx) =>
              !menuItem.path.startsWith('http') ? (
                <NavLink
                  key={idx}
                  exact
                  to={menuItem.path}
                  className={classList(
                    'font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out',
                    idx !== 0 && 'ml-8'
                  )}
                >
                  {menuItem.text}
                </NavLink>
              ) : (
                <a
                  key={idx}
                  href={menuItem.path}
                  className={classList(
                    'font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out',
                    idx !== 0 && 'ml-8'
                  )}
                >
                  {menuItem.text}
                </a>
              )
            )}
          </div>
        </nav>
      </div>
      <CSSTransition
        in={isOpen}
        timeout={{
          enter: 150,
          exit: 100,
        }}
        classNames={{
          enter: 'ease-out opacity-0 scale-95',
          enterDone: 'duration-150 ease-out opacity-100 scale-100',
          exit: 'duration-100 ease-in opacity-0 scale-95',
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-md">
            <div className="rounded-lg bg-white shadow-xs overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="/img/logos/workflow-mark-on-white.svg"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3">
                {Object.values(menu).map((menuItem, idx) => (
                  <NavLink
                    key={idx}
                    exact
                    to={menuItem.path}
                    className={classList(
                      'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-150 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out',
                      idx === 0 && 'mt-1'
                    )}
                    activeClassName="text-white bg-gray-900"
                  >
                    {menuItem.text}
                  </NavLink>
                ))}
              </div>
              <div>
                <a
                  href="#"
                  className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}
