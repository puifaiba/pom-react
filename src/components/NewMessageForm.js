import React, {Component} from "react"
// import axios from "axios"
import {API_ROOT} from "../constants/index"

class NewMessageForm extends Component {
  state = {
    content: "",
    chat_id: this.props.chat_id,
    user_id: this.props.user_id,
  }

  componentDidUpdate = (nextProps) => {
    if (this.props.chat_id !== nextProps.chat_id) {
      this.setState({chat_id: nextProps.chat_id})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    })
    this.setState({content: ""})
  }

  handleChange = (e) => {
    this.setState({content: e.target.value})
  }

  render() {
    return (
      <div className="new-message-form">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            placeholder="enter text"
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
            className="ui input"
          />
          <button
            type="submit"
            value="submit"
            className="ui violet basic icon button"
          >
            <i aria-hidden="true" class="plus icon"></i>
          </button>
        </form>
      </div>
    )
  }
}

export default NewMessageForm
