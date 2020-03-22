import React from 'react'

const TwoByTwoSection = props => {
  const { children } = props

  return (
    <div className="py-32 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {React.Children.map(children, (child, i) => {
          if (child.type.displayName.startsWith('SectionHeader')) return child
        })}

        <div className="mt-10">
          <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
            {React.Children.map(children, (child, i) => {
              if (child.type.displayName.startsWith('SectionColumn'))
                return <li>{child}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TwoByTwoSection
