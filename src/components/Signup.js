import React, {Component} from "react"
import axios from "axios"

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
        <div>{this.state.errors ? this.handleErrors : null}</div>
      </div>
    )
  }
}

export default Signup
