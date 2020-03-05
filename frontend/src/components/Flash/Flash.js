import React, { useRef, useState, useEffect } from 'react'
import { classList } from '../UI/helpers'
import PropTypes from 'prop-types'

const Flash = ({ id, type, title, body, time = 3000, remove }) => {
  const removeRef = useRef()
  const [show, setShowState] = useState(true)
  removeRef.current = remove

  useEffect(() => {
    const setTimeoutInstance = setTimeout(() => setShowState(false), time)
    return () => clearTimeout(setTimeoutInstance)
  }, [time])

  return (
    <div
      id={id}
      className={classList(
        'flash flex items-center mb-2 animated fadeInDown', //offscreen-right slide-in-left
        type,
        !show && 'fadeOutUp'
      )}
      role="alert"
      onAnimationEnd={e => {
        if (e.target.classList.contains('fadeOutUp')) removeRef.current()
      }}
      onClick={() => setShowState(false)}
    >
      <div>
        {title && <strong className="font-bold mr-1">{title}</strong>}
        {body && <span className="block sm:inline">{body}</span>}
      </div>
      <button className="flash-close px-4 py-2">
        <span>
          <svg
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
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

export default Flash
