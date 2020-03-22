import React from 'react'

const HeaderWithLabel = props => {
  const {
    label = 'Label',
    title = 'A strong main title',
    subtitle = 'Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.',
  } = props
  return (
    <div className="lg:text-center">
      <p className="text-base leading-6 text-primary-600 font-semibold tracking-wide uppercase">
        {label}
      </p>
      <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        {title}
      </h3>
      <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
        {subtitle}
      </p>
    </div>
  )
}
HeaderWithLabel.displayName = `SectionHeader-${HeaderWithLabel.name}`

export default HeaderWithLabel
