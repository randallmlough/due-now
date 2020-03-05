import React, { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'

import FlashContext from './context'
import Flash from './Flash'

const generateFlashID = () => {
  let first = (Math.random() * 46656) | 0
  let second = (Math.random() * 46656) | 0
  first = ('000' + first.toString(36)).slice(-3)
  second = ('000' + second.toString(36)).slice(-3)

  return first + second
}

function withFlashProvider(Component) {
  function WithFlashProvider(props) {
    const [flashs, setFlashs] = useState([])

    // add a flash
    const add = ({
      type = 'danger',
      title = 'Uh oh!',
      body = 'An error occurred',
      time = 4000,
    } = {}) => {
      const id = generateFlashID()
      setFlashs([...flashs, { id, type, time, title, body }])
    }

    // remove a flash
    const remove = id => setFlashs(flashs.filter(flash => flash.id !== id))

    const providerValue = useMemo(() => {
      return { add, remove }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flashs])

    return (
      <FlashContext.Provider value={providerValue}>
        <Component {...props} />

        {createPortal(
          <div className="flash-wrapper">
            {flashs.map(flash => (
              <Flash
                key={flash.id}
                id={flash.id}
                type={flash.type}
                time={flash.time}
                title={flash.title}
                body={flash.body}
                remove={() => remove(flash.id)}
              />
            ))}
          </div>,
          document.body
        )}
      </FlashContext.Provider>
    )
  }
  return WithFlashProvider
}

export default withFlashProvider
