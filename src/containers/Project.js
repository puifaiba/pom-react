import React, {Component} from "react"
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
      const columns = res.data.map((column) => {
        return {
          ...column,
          tasks: column.tasks.filter(
            (task) => task.user.id === this.props.user.id
          ),
        }
      })
      this.setState({columns})
    })

    axios.get(`${API_ROOT}/tasks`).then((res) => {
      const tasks = res.data.filter(
        (task) => task.user.id === this.props.user.id
      )
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

    const start = this.state.columns.filter(
      (column) => column.value === source.droppableId
    )[0]
    const finish = this.state.columns.filter(
      (column) => column.value === destination.droppableId
    )[0]
    // const start = this.state.columns[source.droppableId]
    // const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.tasks)
      const [reorderedTask] = newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, reorderedTask)

      const newColumn = {
        ...start,
        tasks: newTaskIds,
      }

      const newState = [...this.state.columns].map((column) => {
        if (column.id === newColumn.id) {
          return {
            columns: newColumn,
          }
        }
        return {columns: this.state.columns}
      })
      this.setState(newState)
      return
    } else {
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
      return
    }
  }

  addTask = (task) => {
    axios.post(`${API_ROOT}/tasks/`, {task}).then((res) => {
      // returns column where ask was added
      const newTask = [...this.state.columns].map((column) => {
        if (column.id === task.column_id) {
          return {
            ...column,
            tasks: [...column.tasks, task],
          }
        }
        return {...column, tasks: column.tasks}
      })
      this.setState((prevState, props) => {
        return {columns: newTask}
      })
    })
  }

  handleUpdate = (task, event) => {
    event.preventDefault()
    axios.patch(`${API_ROOT}/tasks/${task.id}`, {task}).then((res) => {
      const updatedTask = [...this.state.columns].map((column) => {
        if (column.id === task.column_id) {
          return {
            ...column,
            tasks: [
              ...column.tasks.filter((item) => item.id !== task.id),
              task,
            ],
          }
        }
        return {...column, tasks: column.tasks}
      })
      this.setState((prevState, props) => {
        return {columns: updatedTask}
      })
    })
  }

  handleDelete = (task, event) => {
    event.preventDefault()
    axios.delete(`${API_ROOT}/tasks/${task.id}`).then((res) => {
      // iterates through each column to find the column with the task then filter out task
      const newColumns = [...this.state.columns].map((column) => {
        if (column.tasks.includes(task)) {
          return {
            ...column,
            tasks: column.tasks.filter((item) => item.id !== task.id),
          }
        }
        return {...column, tasks: column.tasks}
      })
      this.setState((prevState, props) => {
        return {columns: newColumns}
      })
    })
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columns.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={column.tasks}
                handleDelete={this.handleDelete}
                handleUpdate={this.handleUpdate}
                addTask={this.addTask}
                user={this.props.user}
              />
            )
          })}

          {/* {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId]
            const tasks = column.tasks.id.map(
              (taskId) => this.state.tasks[taskId]
            )

            return <Column key={column.id} column={column} tasks={tasks} />
          })} */}
        </Container>
      </DragDropContext>
    )
  }
}

export default Project
