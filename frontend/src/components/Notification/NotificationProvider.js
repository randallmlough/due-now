import React, { useEffect, useReducer, useContext } from 'react'
import NotificationContext, { Provider } from './context'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPortal } from 'react-dom'
import Notification from './Notification'

const useForceRender = () => {
  const [, forceRender] = useReducer(oldVal => oldVal + 1, 0)
  return forceRender
}

const NotificationProvider = props => {
  const { children } = props
  const notificationController = useContext(NotificationContext)
  const forceRender = useForceRender()

  useEffect(() => {
    notificationController.subscribe(forceRender)
    return () => notificationController.unsubscribe()
  }, [forceRender, notificationController])

  return (
    <Provider value={notificationController}>
      {children}
      {createPortal(
        <div className="notification-wrapper">
          {notificationController.notifications.map(notification => {
            return (
              <Notification
                key={notification.id}
                id={notification.id}
                type={notification.type}
                time={notification.time}
                title={notification.title}
                body={notification.body}
                remove={() =>
                  notificationController.removeNotification(notification.id)
                }
              />
            )
          })}
        </div>,
        document.body
      )}
    </Provider>
  )
}

NotificationProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
}

const mapDispatchToProps = dispatch => ({ dispatch })
export default connect(null, mapDispatchToProps)(NotificationProvider)
