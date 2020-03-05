import { useContext, useMemo } from 'react'
import NotificationContext from './context'

const useNotification = () => {
  const context = useContext(NotificationContext)
  const add = useMemo(() => context.addNotification.bind(context), [context])
  return { add }
}

export default useNotification
