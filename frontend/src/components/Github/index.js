import React from 'react'
import { ReactComponent as GithubRibbon } from './github-ribbon.svg'
import './Github.css'
import { Link } from 'react-router-dom'

export default function(props) {
  const { githubLink } = props
  return (
    <Link
      to={githubLink}
      className="github-corner"
      ariaLabel="View source on GitHub"
    >
      <GithubRibbon />
    </Link>
  )
}
