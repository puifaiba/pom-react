import React, {Component} from "react"
import styled from "styled-components"
import {Droppable} from "react-beautiful-dnd"
import Task from "./Task"
import NewTaskForm from "../components/NewTaskForm"

const Container = styled.div`
  margin: 10px;
  border: 1px solid blue;
  border-radius: 5px;
  width: 25rem;
  display: flex;
  flex-direction: column;
  background-color: lightsteelblue;
`
const Title = styled.h3`
  padding: 10px;
  text-align: left;
  margin: 10px;
`
const TaskList = styled.div`
  padding: 8px;
  margin: 15px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "royalblue" : "lightsteelblue"};
  flex-grow: 1;
  min-height: 40rem;
  border-radius: 5px;
`

class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.label}</Title>
        <Droppable droppableId={toString(this.props.column.id)}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    handleDelete={this.props.handleDelete}
                    handleUpdate={this.props.handleUpdate}
                  />
                )
              })}
              {provided.placeholder}
              <NewTaskForm
                addTask={this.props.addTask}
                user={this.props.user}
                column={this.props.column}
              />
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}

export default Column
