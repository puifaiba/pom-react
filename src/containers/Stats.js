import React from "react"

function Stats(props) {
  return (
    <div className="stats-container">
      <h1>STATS PAGE</h1>
      <p>
        {props.user.first_name} {props.user.last_name}'s progress
      </p>
      <p>POMs completed</p>
    </div>
  )
}

export default Stats
