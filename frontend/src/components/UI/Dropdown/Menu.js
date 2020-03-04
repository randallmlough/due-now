import React from 'react'
const DropdownMenu = React.forwardRef(({ children }, ref) => {
  return (
    <div
      className="dropdown-menu dropdown-menu-right shadow-lg animate slideIn"
      aria-labelledby="navbarDropdown"
      ref={ref}
    >
      {children}
    </div>
  )
})
const name = DropdownMenu.displayName || DropdownMenu.name
DropdownMenu.displayName = `dropdownMenu(${name})`
export default DropdownMenu
