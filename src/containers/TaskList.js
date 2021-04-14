// import React, { useState, useEffect } from "react"

// const TaskList = (props) => {

//   const TASK_URL = "http://localhost:3000/api/v1/tasks/"
//   const blankForm = {
//     name: "",
//     description: "",
//     due_date: "",
//   }

//   const [task, setTask] = useState([])
//   const [createForm, setCreateForm] = useState(blankForm)
//   const [updateForm, setUpdateForm] = useState(blankForm)

//   const getTaskList = async () => {
//     const response = await fetch(TASK_URL)
//     const data = await response.json()
//     setTask(data)
//   }

//   const displayTaskList = () => {
//       <div>
//           {task.map(task => (
//               <div>
//                   <h2>{task.name}</h2>
//                   <h3>{task.description}</h3>
//                   <button onClick={() => setUpdateForm(task)}>Edit</button>
//                   <button onClick={() => handleDelete(task)}>Delete</button>
//               </div>
//           ))}
//       </div>
//   }

//   const noTasks = <h1>No tasks</h1>

//   const handleCreateChange = (event) => {
//       setCreateForm({ ...createForm, [event.target.name]: event.target.value })
//   }

//   const handleCreate = async event => {
//       event.preventDefault()

//       const response = await fetch(TASK_URL), {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.strigify(createForm),
//       })
//       await getTaskList()
//       setCreateForm(blankForm)
//   }

//   const handleUpdate = async event => {
//       event.preventDefault()

//       const response = await fetch(TASK_URL+ updateForm.id,
//         {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updateForm),
//         }
//     )
//     await getTaskList()
//     setUpdateForm(blankForm)
//   }

//   const handleDelete = async todo => {
//       event.preventDefault()

//       const response = await fetch(TASK_URL+ task.id, {
//           method: "DELETE",
//       })
//       await getTaskList()
//   }

//     useEffect(() => {
//         getTaskList()
//     }, [])

//     return (
//         <div>
//             <h1>Task List</h1>
//             <h1>Add a Task</h1>
//             <form onSubmit={handleCreate}>
//                 <input type="text" name="name" value={createForm.name} onChange={handleCreateChange} />
//                 <input type="text" name="content" value={createForm.content} onChange={handleCreateChange} />
//                 <input type="submit" value="Add Task" />
//             </form>
//             <h1>Tasks</h1>
//             {task.length > 0 ? displayTaskList() : noTasks}
//         </div>
//     )

// }

// export default TaskList
