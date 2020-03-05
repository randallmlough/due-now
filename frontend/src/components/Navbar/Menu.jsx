import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

export const DefaultMenu = ({ open, mobile, setOpen, children }) => {
  const drawer = useRef(null)
  useEffect(() => {
    if (open && drawer) {
      drawer.current.classList.remove('hidden', 'slideOutLeft')
      drawer.current.classList.add('slideInLeft')
    } else if (!open && drawer) {
      drawer.current.classList.remove('slideInLeft')
      drawer.current.classList.add('slideOutLeft')
    }
  }, [open, drawer])

  useEffect(() => {
    if (drawer) {
      function drawerAnimationListener() {
        if (drawer.current.classList.contains('slideOutLeft')) {
          drawer.current.classList.remove('slideOutLeft')
          drawer.current.classList.add('hidden')
        }
      }
      drawer.current.addEventListener('animationend', drawerAnimationListener)
      return () => {
        drawer.current.removeEventListener(
          'animationend',
          drawerAnimationListener
        )
      }
    }
  }, [drawer])
  return (
    <div
      className="w-64 xl:w-1/5 fixed bottom-0 left-0 top-0 flex flex-col bg-gray-900 shadow-2xl pl-6 py-20 z-40 animated faster hidden slideInLeft"
      ref={drawer}
    >
      <nav>{children}</nav>
    </div>
  )
}

DefaultMenu.propTypes = {
  open: PropTypes.bool,
  mobile: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.object,
}
