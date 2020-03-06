import React from 'react'
import { classList } from './helpers'
export default function Pill({ children, ...props }) {
  const {
    // color variants
    white,
    black,
    dark,
    gray,
    primary,
    secondary,
    success,
    danger,
    warning,

    // shading
    bs: baseShade,
    hs: hoverShade,
    fs: focusShade,

    // styling
    rounded,
    //  sizing
    small,
    large,
    textSmall,
    textLarge,
    paddingSmall,
    paddingLarge,
    // text decoration
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
    dark,
    gray,
    primary,
    secondary,
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

  return (
    <span
      className={classList(
        'relative inline-block font-semibold leading-tight',
        // sizing
        small || textSmall
          ? 'text-xs'
          : large || textLarge
          ? 'text-base'
          : 'text-sm',
        small || paddingSmall
          ? 'px-2 py-1'
          : large || paddingLarge
          ? 'px-4 py-2'
          : 'px-3 py-1',
        uppercase
          ? 'uppercase'
          : titlecase
          ? 'capitalize'
          : lowercase
          ? 'lowercase'
          : '',
        // color variants
        textPillStyles(variant),
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={classList(
          'absolute inset-0',
          bgPillStyles(variant),
          rounded ? 'rounded' : 'rounded-full'
        )}
      ></span>
      <span className="relative">{children}</span>
    </span>
  )
}

export const textPillStyles = (
  variant = 'default',
  { baseShade = 700 } = {}
) => {
  switch (variant) {
    case 'white':
      return `text-primary-${baseShade}`
    case 'black':
      return `text-white`
    case 'default':
      return `text-gray-${baseShade}`
    default:
      return `text-${variant}-${baseShade}`
  }
}

export const bgPillStyles = (
  variant = 'default',
  { baseShade = 200, baseOpacity = 50 } = {}
) => {
  switch (variant) {
    case 'white':
      return `bg-white opacity-${baseOpacity}`
    case 'black':
      return `bg-black opacity-${baseOpacity}`
    case 'default':
      return `bg-gray-300 opacity-${baseOpacity}`
    default:
      return `bg-${variant}-${baseShade} opacity-${baseOpacity}`
  }
}
