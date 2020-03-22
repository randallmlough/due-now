import React from 'react'
import { Icon } from '..'

const Column = props => {
  const {
    icon = 'user',
    title = 'A strong main title',
    subtitle = 'Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.',
  } = props

  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
          <Icon icon={icon} />
        </div>
      </div>
      <div className="ml-4">
        <h5 className="text-lg leading-6 font-medium text-gray-900">{title}</h5>
        <p className="mt-2 text-base leading-6 text-gray-500">{subtitle}</p>
      </div>
    </div>
  )
}
Column.displayName = `SectionColumn-${Column.name}`

export default Column
