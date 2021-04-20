import React, {Component} from "react"
import styled from "styled-components"
import {Draggable} from "react-beautiful-dnd"
import Timer from "../containers/Timer"

const Container = styled.div`
  border: 1px solid blue;
  border-radius: 2px;
  padding: 8px 12px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "powderblue" : "lavender"};
  text-align: left;
`
const TaskButtons = styled.div`
  text-align: center;
  padding: 8px;
`

class Task extends Component {
  state = {
    timerShown: false,
  }

  showTimer = (e) => {
    this.setState({timerShown: !this.state.timerShown})
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
                onClick={this.props.handleUpdate.bind(this, this.props.task)}
                type="submit"
                value="update"
              >
                Edit
              </button>
              <button
                onClick={this.props.handleDelete.bind(this, this.props.task)}
                type="submit"
                value="delete"
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  this.showTimer()
                }}
              >
                Timer
              </button>
              <Timer timerShown={this.state.timerShown} />
            </TaskButtons>
          </Container>
        )}
      </Draggable>
    )
  }
}

export default Task
