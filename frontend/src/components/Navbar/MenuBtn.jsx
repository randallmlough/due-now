import React from 'react'
import { classList } from '../UI/helpers'
import PropTypes from 'prop-types'

export default function MenuBtn({ open, setOpen }) {
  return (
    <button
      type="button"
      className={classList(
        'flex flex-col justify-around h-6 z-50 mr-3 focus:outline-none',
        'menu-btn',
        open && 'open'
      )}
      onClick={() => setOpen(!open)}
    >
      <span />
      <span />
      <span />
    </button>
  )
}
MenuBtn.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}
