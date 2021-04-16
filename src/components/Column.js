import React, {Component} from "react"
import styled from "styled-components"
import {Droppable} from "react-beautiful-dnd"
import Task from "./Task"

const Container = styled.div`
  margin: 8px;
  border: 1px solid blue;
  border-radius: 2px;
  width: 20rem;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "royalblue" : "lightskyblue"};
  flex-grow: 1;
  min-height: 8rem;
`

class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}

export default Column
