import React, {Component} from "react"
import "./App.css"
import {Route, Switch, withRouter} from "react-router-dom"
import axios from "axios"

import Header from "./components/Header"
import Timer from "./containers/Timer"
import LogIn from "./containers/LogIn"
import LogOut from "./containers/LogOut"

const LOGGED_IN_URL = "http://localhost:3001/logged_in"

class App extends Component {

  state = {
    isLoggedIn: false,
    user: {}
  }

  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
    axios.get(LOGGED_IN_URL, 
      {withCredentials: true})
      .then(res => {
        if (res.data.logged_in) {
          this.handleLogin(res)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={} />
          <Route exact path="/timer" component={Timer} />
          <Route exact path="/login" component={} />
          <Route exact path="/signup" component={} />
          {/* <Route exact path="/logout" component={LogOut} /> */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
