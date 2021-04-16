import React, {Component} from "react"
import initialData from "../constants/initial-data"
import Column from "../components/Column"
import "@atlaskit/css-reset"
import {DragDropContext} from "react-beautiful-dnd"

class Project extends Component {
  state = initialData

  onDragEnd = (result) => {}

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId]
          const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </DragDropContext>
    )
  }
}

export default Project
