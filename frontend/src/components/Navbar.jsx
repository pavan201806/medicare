import React from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Navigation Bar Component
 * Clean, professional navigation for healthcare application
 */
const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          AI Medical Assistant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/assistant') ? 'active' : ''}`}
                to="/assistant"
              >
                Medical Assistant
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/medicine') ? 'active' : ''}`}
                to="/medicine"
              >
                Medicine Info
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/appointment') ? 'active' : ''}`}
                to="/appointment"
              >
                Appointments
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


