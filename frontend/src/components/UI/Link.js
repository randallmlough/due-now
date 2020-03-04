import React from 'react'
import { classList } from './helpers'
import { Link as RouterLink } from 'react-router-dom'
import { buttonStylesSolid, buttonStylesOutline } from './Button'
export default function Link({ children, ...props }) {
  const {
    // color variants
    white,
    black,
    primary,
    secondary,
    neutral,
    success,
    danger,
    warning,

    // shades
    light,
    dark,
    dShade: defaultShade,
    hShade: hoverShade,
    fShade: focusShade,

    // styling
    button,
    outline,
    // sizing
    small,
    large,
    textSmall,
    textLarge,
    paddingSmall,
    paddingLarge,

    // text styling
    uppercase,
    titlecase,
    lowercase,

    // additional classes to be added
    className,
    // all other props
    ...rest
  } = props

  let variants = {
    white,
    black,
    primary,
    secondary,
    neutral,
    success,
    danger,
    warning,
  }

  let variant
  for (let [key, value] of Object.entries(variants)) {
    if (value === true) {
      variant = key
    }
  }
  const lightShade = { defaultShade: 400, hoverShade: 300, focusShade: 500 }
  const darkShade = { defaultShade: 600, hoverShade: 500, focusShade: 800 }
  const shading = light
    ? lightShade
    : dark
    ? darkShade
    : { defaultShade, hoverShade, focusShade }

  return (
    <RouterLink
      className={classList(
        'no-underline',
        // sizing
        small || textSmall
          ? 'text-xs'
          : large || textLarge
          ? 'text-base'
          : 'text-sm', // regular size
        small || paddingSmall
          ? 'px-4 py-2'
          : large || paddingLarge
          ? 'px-8 py-3'
          : 'px-6 py-3',
        uppercase
          ? 'uppercase'
          : titlecase
          ? 'capitalize'
          : lowercase
          ? 'lowercase'
          : '',
        // color variants
        button
          ? buttonStylesSolid(variant, shading) + ' rounded'
          : outline
          ? buttonStylesOutline(variant, shading) + ' rounded'
          : linkStyles(variant, shading),
        className
      )}
      {...rest}
    >
      {children}
    </RouterLink>
  )
}

export const linkStyles = (
  variant = 'default',
  { defaultShade = 600, hoverShade = 700, focusShade = 700 } = {}
) => {
  switch (variant) {
    case 'white':
      return `text-white hover:text-primary-${hoverShade}`
    case 'black':
      return 'text-black'
    case 'default':
      return `text-gray-${defaultShade} hover:text-gray-${hoverShade} focus:text-gray-${focusShade}`
    default:
      return `text-${variant}-${defaultShade} hover:text-${variant}-${hoverShade} focus:text-${variant}-${focusShade}`
  }
}
