import React, { useRef, useEffect } from 'react'
import { classList } from '../UI/helpers'
import PropTypes from 'prop-types'
import './flash.css'

export default function Flash({
  id,
  type = 'default',
  title,
  body,
  time = 4000,
  remove,
}) {
  useEffect(() => {
    if (time !== null) {
      const setTimeoutInstance = setTimeout(
        () => addClosingAnimationClass(),
        time
      )
      return () => clearTimeout(setTimeoutInstance)
    }
  }, [time])

  const removeRef = useRef()
  removeRef.current = remove

  const flashWrapper = useRef(null)

  useEffect(() => {
    const animationEndListener = e => {
      if (
        !flashWrapper.current ||
        flashWrapper.current.classList.contains('fadeOutUp')
      ) {
        removeRef.current()
      }
    }
    flashWrapper.current.addEventListener('animationend', animationEndListener)
    return () => {
      flashWrapper.current.removeEventListener(
        'animationend',
        animationEndListener
      )
    }
  }, [flashWrapper])

  const addClosingAnimationClass = () => {
    if (flashWrapper.current) {
      flashWrapper.current.classList.add('fadeOutUp')
    }
  }

  return (
    <div
      id={id}
      className={classList(
        'px-4 py-3 rounded relative shadow flex items-center mb-2 animated fadeInDown', //offscreen-right slide-in-left
        bodyVariantStyling(type)
      )}
      role="alert"
      ref={flashWrapper}
    >
      <div>
        {title && <strong className="font-bold mr-1">{title}</strong>}
        {body && <span className="block sm:inline">{body}</span>}
      </div>
      <button
        className="flash-close px-4 py-2"
        onClick={addClosingAnimationClass}
      >
        <span>
          <svg
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className={'h-6 w-6 fill-current ' + iconVariantStyling(type)}
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </button>
    </div>
  )
}
Flash.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string.isRequired,
  time: PropTypes.number,
  remove: PropTypes.func.isRequired,
}

const bodyVariantStyling = (
  variant = 'default',
  { bgShade = 100, textShade = 700 } = {}
) => {
  switch (variant) {
    case 'default':
      return `bg-white text-dark-${textShade}`
    default:
      return `bg-${variant}-${bgShade} text-${variant}-${textShade}`
  }
}
const iconVariantStyling = (variant = 'default', { textShade = 700 } = {}) => {
  switch (variant) {
    case 'default':
      return `bg-white`
    default:
      return `text-${variant}-${textShade}`
  }
}

export const logoutFlash = {
  type: 'success',
  body: 'You have been successfully logged out',
}
