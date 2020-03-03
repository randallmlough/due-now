import { useContext, useEffect, useReducer, useMemo } from 'react'
import { generateRandomKey } from '../../utils/helpers'
import SessionContext from './SessionContext'

const useForceRender = () => {
  const [, forceRender] = useReducer(oldVal => oldVal + 1, 0)
  return forceRender
}

export const useSession = () => {
  const session = useContext(SessionContext)
  if (!session) {
    throw new Error('Missing <SessionProvider>')
  }
  const currentSession = session.getSession()

  const forceRender = useForceRender()
  useEffect(() => {
    const key = generateRandomKey()
    session.subscribeSessionUpdates(key, forceRender)
    return () => session.unsubscribeSessionUpdates(key)
  }, [forceRender, session]) // session may need to be removed as a dependency. Leaving comment here in case issues arise later on
  const setSession = useMemo(() => session.setSession.bind(session), [session])
  const removeSession = useMemo(() => session.removeSession.bind(session), [
    session,
  ])

  return [currentSession, setSession, removeSession]
}
