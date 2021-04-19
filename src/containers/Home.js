import React from "react"
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div>
      <Link to="/login" className="home">
        Log In
      </Link>
      <Link to="/signup" className="home">
        Sign Up
      </Link>
    </div>
  )
}

export default Home
