import React, { useEffect, useRef } from 'react'
import { DropdownButtonIcon } from './Button'
import DropdownMenu from './Menu'
import './dropdown.css'

const DropdownIcon = ({ buttonText = 'Click me', children }) => {
  const dropdownMenu = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const dropdownListener = e => {
      if (!wrapperRef.current || wrapperRef.current.contains(e.target)) {
        return
      } else {
        dropdownMenu.current.classList.remove('show')
      }
    }
    document.addEventListener('mousedown', dropdownListener)
    return () => {
      document.removeEventListener('mousedown', dropdownListener)
    }
  }, [dropdownMenu])
  return (
    <div className="relative" ref={wrapperRef}>
      <DropdownButtonIcon menuRef={dropdownMenu} buttonText={buttonText} />
      <DropdownMenu ref={dropdownMenu}>{children}</DropdownMenu>
    </div>
  )
}

export default DropdownIcon
