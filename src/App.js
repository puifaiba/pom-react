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
import ChatList from "./containers/ChatList"
import Stats from "./containers/Stats"
import Project from "./containers/Project"

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
          user={this.state.user}
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
          <Route
            exact
            path="/timer"
            render={(props) => (
              <Timer
                {...props}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/chats"
            render={(props) => (
              <ChatList
                {...props}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/stats"
            render={(props) => (
              <Stats
                {...props}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/projects"
            render={(props) => (
              <Project
                {...props}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
