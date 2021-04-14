import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"

const LOGOUT_URL = "http://localhost:3001/logout"

const Navbar = (props) => {
  const handleLogOutClick = () => {
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
        <div>
          <Link to="/timer">Timer</Link>
          <Link to="/chats">Messages</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/logout" onClick={handleLogOutClick}>
            Log Out
          </Link>
          <h2>Hi, {props.user.first_name}</h2>
          <h3>Let's get focused!</h3>
        </div>
      ) : null}
    </div>
  )
}

export default Navbar
