import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from "react-router-dom"
import {ActionCableProvider} from "react-actioncable-provider"
import {API_WS_ROOT} from "./constants/index"

import "./index.css"
import App from "./App"

ReactDOM.render(
  <Router>
    <div>
      <ActionCableProvider url={API_WS_ROOT}>
        <App />
      </ActionCableProvider>
    </div>
  </Router>,
  document.getElementById("root")
)
