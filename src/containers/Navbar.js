import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"

const LOGOUT_URL = "http://localhost:3001/logout"

const Navbar = (props) => {
  const handleClick = () => {
    axios
      .delete(LOGOUT_URL, {withCredentials: true})
      .then((res) => {
        props.handleLogout()
        props.history.push("/")
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      {props.loggedInStatus ? (
        <Link to="/logout" onClick={handleClick}>
          Log Out
        </Link>
      ) : null}
    </div>
  )
}

export default Navbar
