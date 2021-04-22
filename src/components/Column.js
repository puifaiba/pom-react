import React, {Component} from "react"
import styled from "styled-components"
import {Droppable} from "react-beautiful-dnd"
import Task from "./Task"
import NewTaskForm from "../components/NewTaskForm"

const Container = styled.div`
  margin: 5px 10px 10px;
  border: 1px solid #fffacd;
  border-radius: 5px;
  box-shadow: 3px 3px 5px black;
  width: 26rem;
  display: flex;
  flex-direction: column;
  background-color: midnightblue;
  text-align: right;
`
const Title = styled.h3`
  padding: 10px;
  text-align: left;
  margin: 10px;
  color: #fffacd;
`
const TaskList = styled.div`
  padding: 8px;
  margin: 0 10px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "#fffacd" : "midnightblue"};
  flex-grow: 1;
  min-height: 40rem;
  border-radius: 5px;
`

class Column extends Component {
  state = {
    newFormOpen: false,
  }

  openNewTaskForm = (event) => {
    this.setState({newFormOpen: !this.state.newFormOpen})
  }

  render() {
    return (
      <Container>
        <Title>{this.props.column.label}</Title>
        <Droppable droppableId={this.props.column.value}>
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
              <button
                onClick={(event) => {
                  this.openNewTaskForm()
                }}
                className="ui violet basic icon button"
              >
                <i aria-hidden="true" className="plus icon"></i>
              </button>
              <NewTaskForm
                addTask={this.props.addTask}
                user={this.props.user}
                column={this.props.column}
                newFormOpen={this.state.newFormOpen}
                onClick={this.openNewTaskForm}
              />
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}

export default Column
