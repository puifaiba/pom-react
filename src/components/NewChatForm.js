import React, {Component} from "react"
// import axios from "axios"
import {API_ROOT} from "../constants/index"

class NewChatForm extends Component {
  state = {
    name: "",
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${API_ROOT}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    })
    this.setState({name: ""})
  }

  handleChange = (e) => {
    this.setState({name: e.target.value})
  }

  render() {
    return (
      <div className="new-chat-form">
        <form onSubmit={this.handleSubmit}>
          <label>New Chat:</label>
          <br />
          <input
            placeholder="enter name"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default NewChatForm
