import React, {Component} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class EditTaskForm extends Component {
  state = {
    date: new Date(),
    tag: this.props.task.tag || "",
    title: this.props.task.title,
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

  handleEditTask = (event) => {
    event.preventDefault()
    const editedTask = {
      id: this.props.task.id,
      column_id: this.props.task.column.id,
      date: this.state.date,
      tag: this.state.tag,
      title: this.state.title,
      user_id: this.props.task.user.id,
    }
    if (this.state.title !== "") {
      this.props.handleUpdate(editedTask, event)
    }
    this.setState({title: "", tag: "", date: new Date()})
    this.props.onClick && this.props.onClick(event)
  }

  render() {
    return (
      <div className="edit-task-form">
        {this.props.editFormOpen ? (
          <form onSubmit={(event) => this.handleEditTask(event)}>
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

export default EditTaskForm
