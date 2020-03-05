import React from 'react'
import { classList } from '../helpers'
const DropdownMenu = React.forwardRef(
  ({ children, addClass, ...props }, ref) => {
    return (
      <div
        className={classList(
          'dropdown-menu dropdown-menu-right shadow-lg animate slideIn',
          addClass
        )}
        aria-labelledby="navbarDropdown"
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)
const name = DropdownMenu.displayName || DropdownMenu.name
DropdownMenu.displayName = `dropdownMenu(${name})`
export default DropdownMenu
