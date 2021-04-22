import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

const USERS_URL = "http://localhost:3001/users"

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
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
    } = this.state

    let user = {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      first_name: first_name,
      last_name: last_name,
    }

    axios
      .post(USERS_URL, {user}, {withCredentials: true})
      .then((res) => {
        if (res.data.status === "created") {
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
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
    } = this.state

    return (
      <div className="signup-container">
        <div className="signup">Sign Up</div>
        <form onSubmit={this.handleSubmit} className="form ui-centered">
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
            className="form"
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
          <button
            placeholder="submit"
            type="submit"
            className="ui violet basic icon button"
          >
            <i aria-hidden="true" className="sign-in icon"></i>
          </button>
          <div>
            or{" "}
            <Link to="/login" className="link">
              Log In
            </Link>
          </div>
        </form>
        <div>{this.state.errors ? this.handleErrors : null}</div>
      </div>
    )
  }
}

export default Signup
