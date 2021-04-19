import React, {Component} from "react"
// import initialData from "../constants/initial-data"
import Column from "../components/Column"
import "@atlaskit/css-reset"
import {DragDropContext} from "react-beautiful-dnd"
import styled from "styled-components"
import axios from "axios"
import {API_ROOT} from "../constants/index"

const Container = styled.div`
  display: flex;
  margin: 1rem 10rem 1rem;
`

class Project extends Component {
  state = {
    tasks: [],
    columns: [],
  }

  componentDidMount = () => {
    axios.get(`${API_ROOT}/columns`).then((res) => {
      const columns = res.data
      this.setState({columns})
    })

    axios.get(`${API_ROOT}/tasks`).then((res) => {
      const tasks = res.data
      this.setState({tasks})
    })
  }

  onDragEnd = (result) => {
    const {destination, source, draggableId} = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      }
      this.setState(newState)
      return
    }

    const startTasks = Array.from(start.tasks)
    startTasks.splice(source.index, 1)
    const newStart = {
      ...start,
      tasks: startTasks,
    }

    const finishTasks = Array.from(finish.tasks)
    finishTasks.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      tasks: finishTasks,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    this.setState(newState)
  }

  // handleAddTask = (task, event) => {
  //   event.preventDefault()
  //   this.setState({tasks: [...this.state.tasks], task})
  // }

  handleUpdate = (event) => {
    console.log(event)
  }

  handleDelete = (task, event) => {
    event.preventDefault()
    axios.delete(`${API_ROOT}/tasks/${task.id}`).then((res) => {
      console.log(res.data)
    })
    const newTasks = this.state.tasks.filter((item) => item.id !== task.id)
    // this.setState({tasks: newTasks})
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTasks],
    }))
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={column.tasks}
              handleDelete={this.handleDelete}
              handleUpdate={this.handleUpdate}
              // handleAddTask={this.handleAddTask}
            />
          ))}
          {/* {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId]
            const tasks = column.tasks.id.map(
              (taskId) => this.state.tasks[taskId]
            )
            console.log(column)

            return <Column key={column.id} column={column} tasks={tasks} />
          })} */}
        </Container>
      </DragDropContext>
    )
  }
}

export default Project
