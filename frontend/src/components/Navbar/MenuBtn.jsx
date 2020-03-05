import React, { useState } from 'react'
import PropTypes from 'prop-types'

const scopeStyle = {
  height: 3,
  transformOrigin: 1,
}

export default function MenuBtn({ open, setOpen }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      className={
        'flex flex-col justify-around h-6 z-50 mr-3 focus:outline-none ' +
        (open && 'open')
      }
      onClick={() => setOpen(!open)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        className={
          'w-6 rounded-full relative z-50 transition-all duration-500 transform ' +
          (hover ? 'bg-primary-200 ' : 'bg-white ') +
          (open ? 'rotate-45' : 'rotate-0')
        }
        style={scopeStyle}
      />
      <span
        className={
          'w-6 rounded-full relative z-50 transition-all duration-500 transform rotate-0 ' +
          (hover ? 'bg-primary-200 ' : 'bg-white ') +
          (open ? 'opacity-0 translate-x-8' : 'opacity-100')
        }
        style={scopeStyle}
      />
      <span
        className={
          'hover:bg-primary-200 w-6 rounded-full relative z-50 transition-all duration-500 transform ' +
          (hover ? 'bg-primary-200 ' : 'bg-white ') +
          (open ? '-rotate-45' : 'rotate-0')
        }
        style={scopeStyle}
      />
    </button>
  )
}
MenuBtn.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}
