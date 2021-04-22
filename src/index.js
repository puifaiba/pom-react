import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import {ActionCableProvider} from "react-actioncable-provider"
import {API_WS_ROOT} from "./constants/index"

import "./index.css"
import App from "./App"

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Router>
      <div>
        <App />
      </div>
    </Router>
  </ActionCableProvider>,
  document.getElementById("root")
)
