import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Counter = props => {
  const { startValue = 0, onStateChanged } = props
  const [count, setCount] = useState(startValue)

  const handleIncrement = e => {
    e.preventDefault()
    setCount(prevCount => prevCount + 1)
  }
  const handleDecrement = e => {
    e.preventDefault()
    setCount(prevCount => prevCount - 1)
  }
  const handleSetValue = e => {
    e.preventDefault()
    if (!isNaN(e.target.value)) {
      setCount(Number(e.target.value))
    }
  }

  useEffect(() => {
    onStateChanged(count)
  }, [count])

  return (
    <div className="flex flex-row h-10 w-32 rounded-lg relative bg-transparent mt-1">
      <button
        className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        onClick={handleDecrement}
      >
        <span className="m-auto text-2xl font-thin">−</span>
      </button>
      <div className="flex">
        <input
          type="number"
          className="appearance-none bg-gray-300 border border-transparent cursor-default focus:bg-transparent focus:border-primary-500 focus:outline-none focus:text-black font-semibold hover:text-black items-center md:text-base outline-none text-center text-gray-700 text-md w-full"
          value={count}
          onChange={handleSetValue}
        />
      </div>
      <button
        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        onClick={handleIncrement}
      >
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  )
}
Counter.propTypes = {
  startValue: PropTypes.number,
  onStateChanged: PropTypes.func.isRequired,

  // label text or html
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default Counter

export const StackedCounter = props => {
  const { startValue = 0, onStateChanged } = props
  const [count, setCount] = useState(startValue)

  const handleIncrement = e => {
    e.preventDefault()
    setCount(prevCount => prevCount + 1)
  }
  const handleDecrement = e => {
    e.preventDefault()
    setCount(prevCount => prevCount - 1)
  }
  const handleSetValue = e => {
    e.preventDefault()
    if (!isNaN(e.target.value)) {
      setCount(Number(e.target.value))
    }
  }

  useEffect(() => {
    onStateChanged(count)
  }, [count])

  return (
    <div className="bg-transparent flex flex-row relative rounded-lg m-auto w-24">
      <div className="flex flex-grow w-3/4">
        <input
          type="number"
          className="appearance-none bg-gray-300 border border-transparent cursor-default focus:bg-transparent focus:border-primary-500 focus:outline-none focus:text-black font-semibold hover:text-black items-center md:text-base outline-none rounded-l-lg text-center text-gray-700 text-md w-full"
          value={count}
          onChange={handleSetValue}
        />
      </div>
      <div className="flex flex-col w-1/4">
        <button
          className="bg-gray-400 text-gray-600 hover:text-gray-700 hover:bg-gray-500 h-full rounded-tr-lg cursor-pointer"
          onClick={handleIncrement}
        >
          <span className="m-auto font-thin">+</span>
        </button>
        <button
          className=" bg-gray-400 text-gray-600 hover:text-gray-700 hover:bg-gray-500 h-full rounded-br-lg cursor-pointer outline-none"
          onClick={handleDecrement}
        >
          <span className="m-auto font-thin">−</span>
        </button>
      </div>
    </div>
  )
}

StackedCounter.propTypes = {
  startValue: PropTypes.number,
  onStateChanged: PropTypes.func.isRequired,

  // label text or html
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}
