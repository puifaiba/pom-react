// import React, {Component} from "react"
// import axios from "axios"
// // import TaskList from "../components/TaskList"
// import {API_ROOT} from "../constants/index"

// class Board extends Component {
//   state = {
//     lists: [],
//   }

//   componentDidMount = () => {
//     axios.get(`${API_ROOT}/tasks`).then((res) => {
//       const lists = res.data
//       this.setState({lists})
//     })
//   }

//   addTaskCard = (taskText, listNumber) => {
//     const newTask = {
//       taskText,
//       listNumber,
//       timeId: new Date(),
//     }
//   }

//   render() {
//     const lists = this.state.lists.map((list, index) => {
//       ;<li key={index} className="list-container">
//         <TaskList {...list} />
//       </li>
//     })

//     return (
//       <div className="board">
//         <ul className="lists">{lists}</ul>
//       </div>
//     )
//   }
// }

// export default Board
