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
    notificationWrapper.current.addEventListener(
      'animationend',
      animationEndListener
    )
    return () => {
      notificationWrapper.current.removeEventListener(
        'animationend',
        animationEndListener
      )
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
        'rounded relative shadow flex mb-2 overflow-hidden animated fadeInRight',
        bodyVariantStyling(type)
      )}
      role="alert"
      ref={notificationWrapper}
    >
      <div className="flex px-4 py-3">
        <div className="text-3xl mr-3">
          <span role="img" aria-label="hand wave emoji">
            👋
          </span>
        </div>

        <div>
          {title && <div className="text-primary font-bold mr-1">{title}</div>}
          {body && <span className="block sm:inline">{body}</span>}
        </div>
      </div>
      <button
        className="bg-neutral-100 border-l border-neutral-200 duration-150 hover:bg-neutral-200 hover:text-neutral-500 px-4 text-neutral-400 transition-colors focus:outline-none"
        onClick={addClosingAnimationClass}
      >
        Close
      </button>
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

export const welcomeNotification = {
  title: 'Welcome to Invoiced!',
  body: 'Take a look around and see all the fun stuff you can do.',
}

export const authenticatedNotification = {
  title: 'Welcome Back!',
  body: "Here's some things since we last saw you",
}
