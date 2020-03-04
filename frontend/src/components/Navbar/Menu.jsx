import React from 'react'
import { classList } from '../UI/helpers'
import PropTypes from 'prop-types'

export const DefaultMenu = ({ open, mobile, setOpen, children }) => {
  return mobile ? (
    <div
      className={classList(
        'w-64 absolute flex-col bg-gray-900 shadow-2xl pl-6 bottom-0 left-0 top-0',
        'transform -translate-x-full transition-transform duration-300 z-40',
        'mobile-menu',
        open && 'open'
      )}
    >
      <button
        type="button"
        className="py-5 text-2xl text-white font-bold leading-none ml-6 md:ml-0 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        Close
      </button>
      <nav>{children}</nav>
    </div>
  ) : (
    <nav className="relative flex flex-grow items-center w-auto">
      {children}
    </nav>
  )
}

DefaultMenu.propTypes = {
  open: PropTypes.bool,
  mobile: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.object,
}

export const AuthenticatedMenu = ({ open, mobile, setOpen, children }) => {
  return mobile ? (
    <div
      className={classList(
        'w-64 absolute flex-col bg-gray-900 shadow-2xl pl-6 bottom-0 left-0 top-0',
        'transform -translate-x-full transition-transform duration-300 z-40',
        'mobile-menu',
        open && 'open'
      )}
    >
      <button
        type="button"
        className="py-5 text-2xl text-white font-bold leading-none ml-6 md:ml-0 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        Close
      </button>
      <nav>{children}</nav>
    </div>
  ) : (
    <nav className="relative flex flex-grow items-center w-auto">
      {children}
    </nav>
  )
}

AuthenticatedMenu.propTypes = {
  open: PropTypes.bool,
  mobile: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.object,
}
