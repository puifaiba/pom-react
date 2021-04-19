import React, {Component} from "react"

class NewTaskForm extends Component {
  state = {
    userInput: "",
  }

  handleAddTask = (event) => {
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={(event) => this.handleAddTask(event)}>
        <input
          placeholder="enter task"
          type="text"
          name="task"
          value={this.state.userInput}
          onChange={(e) => this.setState({userInput: e.target.value})}
        />
        <button type="submit" value="submit">
          Add Task
        </button>
      </form>
    )
  }
}

export default NewTaskForm
