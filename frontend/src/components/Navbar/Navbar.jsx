import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useOffMenuClick } from './useNavbar'
import { classList } from '../UI/helpers'
import { Link } from '../UI'
import MenuBtn from './MenuBtn'
import { DefaultMenu } from './Menu'
import { useSession } from '../Session'
import UserMenu from './UserMenu'

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
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/invoices"
                    className="block mt-4 mr-4 text-white hover:text-primary-200"
                  >
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
                    Logged out
                  </NavLink>
                </div>
              </DefaultMenu>
            )}
            <div className="ml-auto">
              {session ? (
                <UserMenu />
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
