import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: "",
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    const {email, password} = this.state

    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="Enter password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
