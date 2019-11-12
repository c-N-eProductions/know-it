import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <header id="navbar-header">
    <div id="knowit-logo">
      <img src="images/knowIt-logo.svg" />
      <span id="knowit-logo-text">KnowIt</span>
    </div>
  </header>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {}
