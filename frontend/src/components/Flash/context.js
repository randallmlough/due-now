import React from 'react'
import FlashController from './FlashController'
const FlashContext = React.createContext(new FlashController())

export const { Provider, Consumer } = FlashContext
export default FlashContext
