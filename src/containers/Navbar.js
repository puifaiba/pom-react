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
    <div className="navbar">
      {props.loggedInStatus ? (
        <div>
          <Link to="/tasks" className="link">
            Tasks
          </Link>
          {/* <Link to="/stats" className="link">
            Stats
          </Link> */}
          <Link to="/chats" className="link">
            Messages
          </Link>
          <span className="greeting">
            Hi, {props.user.first_name}. Let's get focused!
          </span>
          <Link
            to="/logout"
            onClick={handleLogOutClick}
            className="link ui pink basic big icon button"
          >
            <i aria-hidden="true" class="sign-out icon"></i>
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export default Navbar
