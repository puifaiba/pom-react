import React from "react"
import moment from "moment"

const Break = ({
  breakDuration,
  decrementBreakDurationByOneMinute,
  incrementBreakDurationByOneMinute,
}) => {
  const breakDurationInMinutes = moment.duration(breakDuration, "s").asMinutes()

  return (
    <div className="break-container">
      <p className="break-label">BREAK TIMER</p>
      <p className="break-duration">{breakDurationInMinutes}</p>
      <button
        onClick={decrementBreakDurationByOneMinute}
        className="break-increment ui teal basic icon button"
      >
        <i aria-hidden="true" class="minus icon"></i>
      </button>
      <button
        onClick={incrementBreakDurationByOneMinute}
        className="break-increment ui teal basic icon button"
      >
        <i aria-hidden="true" class="plus icon"></i>
      </button>
    </div>
  )
}

export default Break
