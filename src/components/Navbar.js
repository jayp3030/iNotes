import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/extra.css'

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">i<span>Notes</span></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/About">About</Link>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <Link className="btn-hero mx-1" to="/login" role="button">Log In</Link>
                    <Link className="btn mx-1" to="/signup" role="button">Sign Up</Link>
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
