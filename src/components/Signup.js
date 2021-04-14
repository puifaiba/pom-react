import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

class Signup extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
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
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
    } = this.state

    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
          <input
            placeholder="first name"
            type="text"
            name="first_name"
            value={first_name}
            onChange={this.handleChange}
          />
          <input
            placeholder="last name"
            type="text"
            name="last_name"
            value={last_name}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    )
  }
}

export default Signup
