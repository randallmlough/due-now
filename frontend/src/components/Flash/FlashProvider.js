import React, { useEffect, useReducer, useContext } from 'react'
import FlashContext, { Provider } from './context'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPortal } from 'react-dom'
import Flash from './Flash'

const useForceRender = () => {
  const [, forceRender] = useReducer(oldVal => oldVal + 1, 0)
  return forceRender
}

const FlashProvider = props => {
  const { children } = props
  const flashController = useContext(FlashContext)
  const forceRender = useForceRender()

  useEffect(() => {
    flashController.subscribe(forceRender)
    return () => flashController.unsubscribe()
  }, [forceRender, flashController])

  return (
    <Provider value={flashController}>
      {children}
      {createPortal(
        <div className="flash-wrapper">
          {flashController.flashes.map(flash => {
            return (
              <Flash
                key={flash.id}
                id={flash.id}
                type={flash.type}
                time={flash.time}
                title={flash.title}
                body={flash.body}
                remove={() => flashController.removeFlash(flash.id)}
              />
            )
          })}
        </div>,
        document.body
      )}
    </Provider>
  )
}

FlashProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
}

const mapDispatchToProps = dispatch => ({ dispatch })
export default connect(null, mapDispatchToProps)(FlashProvider)
