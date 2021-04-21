import React, {Component} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class NewTaskForm extends Component {
  state = {
    date: new Date(),
    tag: "",
    title: "",
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value,
    })
  }
  handleDateChange = (date) => {
    this.setState({date: date})
  }

  handleAddTask = (event) => {
    event.preventDefault()
    const newTask = {
      column_id: this.props.column.id,
      date: this.state.date,
      tag: this.state.tag,
      title: this.state.title,
      user_id: this.props.user.id,
    }
    if (this.state.title !== "") {
      this.props.addTask(newTask)
    }
    this.setState({title: "", tag: "", date: new Date()})
    this.props.onClick && this.props.onClick(event)
  }

  render() {
    return (
      <div className="new-task-form">
        {this.props.newFormOpen ? (
          <form onSubmit={(event) => this.handleAddTask(event)}>
            <label>Title </label>
            <input
              placeholder="enter task"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              className="ui input"
            />
            <br />
            <label>Tag </label>
            <input
              placeholder="enter tag"
              type="text"
              name="tag"
              value={this.state.tag}
              onChange={this.handleChange}
              className="ui input"
            />
            <br />
            <label>Due date </label>
            <DatePicker
              placeholderText="Select due date"
              name="date"
              value={this.state.date}
              selected={this.state.date}
              onChange={this.handleDateChange}
            />
            <br />
            <button
              type="submit"
              value="submit"
              class="ui violet basic icon button"
            >
              <i aria-hidden="true" class="save icon"></i>
            </button>
          </form>
        ) : null}
      </div>
    )
  }
}

export default NewTaskForm
