import React from 'react'

export const DropdownButton = ({ menuRef, buttonText }) => {
  const handleClick = () => {
    const classList = menuRef.current.classList
    classList.toggle('show')
  }

  return (
    <button
      key="dropdown-button"
      className="px-2 block py-1 text-gray-100 whitespace-no-wrap self-center md:block md:flex md:items-center focus:outline-none"
      id="navbarDropdown"
      aria-haspopup="true"
      aria-expanded="false"
      onClick={handleClick}
    >
      <span className="text-sm mr-1">{buttonText}</span>
      <div>
        <svg
          className="fill-current text-white h-4 w-4 block opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"></path>
        </svg>
      </div>
    </button>
  )
}

export default DropdownButton

export function Button({ children, menuRef, buttonText, icon }) {
  const handleClick = () => {
    const classList = menuRef.current.classList
    classList.toggle('show')
  }

  return (
    <button
      key="dropdown-button"
      className="w-1/4 md:w-auto flex text-right focus:outline-none"
      id="navbarDropdown"
      aria-haspopup="true"
      aria-expanded="false"
      onClick={handleClick}
    >
      {children}
      <div className="hidden self-center md:block md:flex md:items-center ml-2">
        <span className="text-white text-sm capitalize mr-1">{buttonText}</span>
        {icon && (
          <div>
            <svg
              className="fill-current text-white h-4 w-4 block opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        )}
      </div>
    </button>
  )
}
