import React, { useEffect, useRef } from 'react'
import Button from './Button'
import DropdownMenu from './Menu'
import './dropdown.css'

export default function Dropdown({
  buttonText = 'Click me',
  children,
  menuClass,
}) {
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
      <Button menuRef={dropdownMenu} buttonText={buttonText} />
      <DropdownMenu ref={dropdownMenu} addClass={menuClass}>
        {children}
      </DropdownMenu>
    </div>
  )
}
