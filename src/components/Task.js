import React, {Component} from "react"
import styled from "styled-components"
import {Draggable} from "react-beautiful-dnd"
// import axios from "axios"
// import {API_ROOT} from "../constants/index"

const Container = styled.div`
  border: 1px solid blue;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging ? "powderblue" : "lavender"};
`

class Task extends Component {
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
            <div>
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
            </div>
          </Container>
        )}
      </Draggable>
    )
  }
}

export default Task
