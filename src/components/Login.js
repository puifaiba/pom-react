import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

const LOGIN_URL = "http://localhost:3001/login"

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
    const {email, password} = this.state

    let user = {
      email: email,
      password: password,
    }

    axios
      .post(LOGIN_URL, {user}, {withCredentials: true})
      .then((res) => {
        if (res.data.logged_in) {
          this.props.handleLogin(res.data)
          this.redirect()
        } else {
          this.setState({
            errors: res.data.errors,
          })
        }
      })
      .catch((error) => console.log("api errors:", error))
  }

  redirect = () => {
    this.props.history.push("/tasks")
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
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
          <button placeholder="submit" type="submit" className="link">
            Log In
          </button>
          <div>
            or{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </div>
        </form>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    )
  }
}

export default Login
