import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { classList } from '../helpers'
import './toggle.css'

const Toggle = props => {
  const {
    onClick,
    onStateChanged,
    children,
    labelFirst = true,
    ...restProps
  } = props
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    let { enabled } = props
    enabled = typeof enabled === 'function' ? enabled() : enabled
    setEnabled(typeof enabled === 'boolean' && enabled)
  }, [])

  const [event, setEvent] = useState(undefined)
  useEffect(() => {
    if (enabled !== props.enabled) {
      const state = { enabled: enabled }
      if (event) {
        const switchEvent = Object.assign(event, { SWITCH_STATE: state })
        typeof onClick === 'function' && onClick(switchEvent)
      }
      typeof onStateChanged === 'function' && onStateChanged(state)
    }
  }, [enabled])

  const toggleSwitch = event => {
    event.persist()
    event.preventDefault()

    setEnabled(!enabled)
    setEvent(event)
  }

  return (
    <label
      htmlFor="toggle"
      className="flex items-center cursor-pointer"
      onClick={toggleSwitch}
      {...restProps}
    >
      {labelFirst && (
        <div className="mr-3 text-gray-700 font-medium">{children}</div>
      )}
      <div className="relative">
        <input
          id="toggle"
          type="checkbox"
          className="hidden"
          checked={enabled}
        />
        <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
        <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow left-0"></div>
      </div>
      {!labelFirst && (
        <div className="ml-3 text-gray-700 font-medium">{children}</div>
      )}
    </label>
  )
}
Toggle.propTypes = {
  theme: PropTypes.string,
  enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onStateChanged: PropTypes.func,
  // optional callback if the toggle is clicked -> sends the event with a state property object
  onClick: PropTypes.func,

  // label text or html
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default Toggle
