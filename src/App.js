import React, {Component} from "react"
import "./App.css"
import {Route, Switch, withRouter} from "react-router-dom"
import axios from "axios"

import Home from "./containers/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Header from "./components/Header"
import Navbar from "./containers/Navbar"
import Timer from "./containers/Timer"

const LOGGED_IN_URL = "http://localhost:3001/logged_in"

class App extends Component {
  state = {
    isLoggedIn: false,
    user: {},
  }

  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
    })
    this.props.history.push("/")
  }

  loginStatus = () => {
    axios
      .get(LOGGED_IN_URL, {withCredentials: true})
      .then((res) => {
        if (res.data.logged_in) {
          this.handleLogin(res)
        } else {
          this.handleLogout()
        }
      })
      .catch((error) => console.log("api errors:", error))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar
          loggedInStatus={this.state.isLoggedIn}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props}
                handleLogin={this.handleLogin}
                loggedInStatus={this.state.isLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                handleLogin={this.handleLogin}
                loggedInStatus={this.state.isLoggedIn}
              />
            )}
          />
          <Route exact path="/timer" component={Timer} />
          {/* <Route exact path="/logout" component={LogOut} /> */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
