import React from "react"
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div className="home-header">POM</div>
      <Link to="/login" className="home">
        Log In
      </Link>
      <Link to="/signup" className="home">
        Sign Up
      </Link>
      <div className="home-body">Facilitating school-to-home communication</div>
    </div>
  )
}

export default Home
