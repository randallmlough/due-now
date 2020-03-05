import React from 'react'
import NotificationController from './NotificationController'
const NotificationContext = React.createContext(new NotificationController())

export const { Provider, Consumer } = NotificationContext
export default NotificationContext
