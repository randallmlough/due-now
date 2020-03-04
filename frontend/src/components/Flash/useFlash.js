import { useContext } from 'react'
import FlashContext from './context'

const useFlash = () => {
  const context = useContext(FlashContext)

  return { add: context.add, remove: context.remove }
}

export default useFlash
