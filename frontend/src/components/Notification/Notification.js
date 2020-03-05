import React, { useRef, useEffect } from 'react'
import { classList } from '../UI/helpers'
import PropTypes from 'prop-types'
import './notification.css'

export default function Notification({
  id,
  type = 'default',
  title,
  body,
  icon,
  time = 5000,
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

  const notificationWrapper = useRef(null)

  useEffect(() => {
    const animationEndListener = e => {
      if (
        !notificationWrapper.current ||
        notificationWrapper.current.classList.contains('fadeOutRight')
      ) {
        removeRef.current()
      }
    }
    document.addEventListener('animationend', animationEndListener)
    return () => {
      document.removeEventListener('animationend', animationEndListener)
    }
  }, [notificationWrapper])

  const addClosingAnimationClass = () => {
    if (notificationWrapper.current) {
      notificationWrapper.current.classList.add('fadeOutRight')
    }
  }

  return (
    <div
      id={id}
      className={classList(
        'px-4 py-3 rounded relative shadow flex items-center mb-2 animated fadeInRight',
        bodyVariantStyling(type)
      )}
      role="alert"
      ref={notificationWrapper}
    >
      <div className="flex">
        <div className="text-3xl mr-3">👋</div>

        <div className="pr-10">
          {title && <div className="text-primary font-bold mr-1">{title}</div>}
          {body && <span className="block sm:inline">{body}</span>}
        </div>
        <button
          className="absolute px-4 py-2 right-0 top-0"
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
    </div>
  )
}
Notification.propTypes = {
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
      return `bg-white text-gray-400`
    default:
      return `bg-${variant}-${bgShade} text-${variant}-${textShade}`
  }
}
const iconVariantStyling = (variant = 'gray', { textShade = 700 } = {}) => {
  switch (variant) {
    default:
      return `text-${variant}-${textShade}`
  }
}
