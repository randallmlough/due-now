import React from 'react'
import { classList } from './helpers'
import { linkStyles } from './Link'
export default function Button({ children, ...props }) {
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

    // shading
    light,
    dark,
    dShade: defaultShade,
    hShade: hoverShade,
    fShade: focusShade,

    // styling
    outline,
    link,
    flat,
    rounded,
    disabled,
    //  sizing
    small,
    large,
    textSmall,
    textLarge,
    paddingSmall,
    paddingLarge,
    full,
    // text decoration
    uppercase,
    titlecase,
    lowercase,
    //misc
    spinner,
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
    <button
      className={classList(
        'font-bold outline-none focus:outline-none transition-all duration-150',
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
        rounded ? 'rounded-full' : 'rounded',
        // color variants
        disabled
          ? buttonStylesDisabledSolid(variant)
          : link
          ? linkStyles(variant, shading)
          : outline
          ? buttonStylesOutline(variant, shading)
          : buttonStylesSolid(variant, shading),
        flat || disabled ? '' : 'transform hover:-translate-y-px',
        full ? 'w-full' : '',
        spinner && 'spinner',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export const buttonStylesDisabledSolid = (
  variant = 'default',
  { defaultShade = 300 } = {}
) => {
  const base = 'shadow border border-transparent cursor-not-allowed '
  switch (variant) {
    case 'white':
      return base + `text-primary-${defaultShade} bg-white`
    case 'black':
      return base + `text-primary-300 bg-black`
    case 'default':
      return base + `text-white bg-gray-${defaultShade}`
    default:
      return base + `text-white bg-${variant}-${defaultShade}`
  }
}

export const buttonStylesSolid = (
  variant = 'default',
  { defaultShade = 500, hoverShade = 400, focusShade = 600 } = {}
) => {
  const base = 'shadow hover:shadow-md border border-transparent '
  switch (variant) {
    case 'white':
      return (
        base +
        `text-primary-${defaultShade} bg-white hover:text-white hover:bg-primary-${defaultShade}`
      )
    case 'black':
      return base + `text-primary-300 bg-black hover:text-primary-500`
    case 'default':
      return (
        base +
        `text-white bg-gray-${defaultShade} hover:bg-gray-${hoverShade} focus:bg-gray-${focusShade}`
      )
    default:
      return (
        base +
        `text-white bg-${variant}-${defaultShade} hover:bg-${variant}-${hoverShade} focus:bg-${variant}-${focusShade}`
      )
  }
}
export const buttonStylesOutline = (
  variant = 'default',
  { defaultShade = 500, hoverShade = 400, focusShade = 600 } = {}
) => {
  const base = 'bg-transparent border-solid border '
  switch (variant) {
    case 'white':
      return (
        base +
        `text-white border-white hover:text-primary-${hoverShade} hover:bg-white`
      )
    case 'black':
    case 'default':
      return (
        base +
        `text-gray-${defaultShade} border-gray-${defaultShade} hover:bg-gray-${hoverShade} hover:text-white`
      )
    default:
      return (
        base +
        `text-${variant}-${defaultShade} border-${variant}-${defaultShade} hover:bg-${variant}-${hoverShade} focus:bg-${variant}-${focusShade} hover:text-white`
      )
  }
}

// function buttonStylesLink(
//   variant = 'default',
//   { defaultShade = 500, hoverShade = 400, focusShade = 800 } = {}
// ) {
//   switch (variant) {
//     case 'white':
//       return `text-white text-primary-${hoverShade}`
//     case 'black':
//     case 'default':
//       return `text-gray-${defaultShade} hover:text-gray-${hoverShade} focus:text-gray-${focusShade}`
//     default:
//       return `text-${variant}-${defaultShade} hover:text-${variant}-${hoverShade} focus:text-${variant}-${focusShade}`
//   }
// }
