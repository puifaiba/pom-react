import React, {Component} from "react"
import styled from "styled-components"
import {Draggable} from "react-beautiful-dnd"
import Timer from "../containers/Timer"
import EditTaskForm from "../components/EditTaskForm"

const Container = styled.div`
  border: 1px solid blue;
  border-radius: 2px;
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging ? "powderblue" : "lavender"};
  text-align: left;
`
const TaskButtons = styled.div`
  text-align: right;
  padding: 8px;
`

class Task extends Component {
  state = {
    timerShown: false,
    editFormOpen: false,
  }

  showTimer = (event) => {
    this.setState({timerShown: !this.state.timerShown})
  }

  openEditTaskForm = (event) => {
    this.setState({editFormOpen: !this.state.editFormOpen})
  }

  render() {
    return (
      <Draggable
        draggableId={toString(this.props.task.id)}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.title}
            <TaskButtons>
              <button
                onClick={(event) => {
                  this.openEditTaskForm()
                }}
                type="submit"
                value="update"
                class="ui violet basic icon button"
              >
                <i aria-hidden="true" class="pencil icon"></i>
              </button>
              <button
                onClick={this.props.handleDelete.bind(this, this.props.task)}
                type="submit"
                value="delete"
                class="ui violet basic icon button"
              >
                <i aria-hidden="true" class="trash icon"></i>
              </button>
              <button
                onClick={(e) => {
                  this.showTimer()
                }}
                class="ui violet basic icon button"
              >
                <i aria-hidden="true" class="clock icon"></i>
              </button>
            </TaskButtons>
            <Timer timerShown={this.state.timerShown} />
            <EditTaskForm
              handleUpdate={this.props.handleUpdate}
              user={this.props.user}
              column={this.props.column}
              editFormOpen={this.state.editFormOpen}
              onClick={this.openEditTaskForm}
              task={this.props.task}
            />
          </Container>
        )}
      </Draggable>
    )
  }
}

export default Task
