import { useContext, useMemo } from 'react'
import FlashContext from './context'

const useFlash = () => {
  const context = useContext(FlashContext)
  const add = useMemo(() => context.addFlash.bind(context), [context])
  return { add }
}

export default useFlash
