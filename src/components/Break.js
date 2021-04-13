import React from "react"
import moment from "moment"

const Break = ({
  breakDuration,
  decrementBreakDurationByOneMinute,
  incrementBreakDurationByOneMinute,
}) => {
  const breakDurationInMinutes = moment.duration(breakDuration, "s").minutes()

  return (
    <div className="break-container">
      <p className="break-label">BREAK TIMER</p>
      <p className="break-duration">{breakDurationInMinutes}</p>
      <button
        onClick={decrementBreakDurationByOneMinute}
        className="break-increment"
      >
        -
      </button>
      <button
        onClick={incrementBreakDurationByOneMinute}
        className="break-increment"
      >
        +
      </button>
    </div>
  )
}

export default Break
