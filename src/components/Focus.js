import React from "react"
import moment from "moment"

const Focus = ({
  focusDuration,
  decrementFocusDurationByOneMinute,
  incrementFocusDurationByOneMinute,
}) => {
  const focusDurationInMinutes = moment.duration(focusDuration, "s").asMinutes()
  return (
    <div className="focus-container">
      <p className="focus-label">FOCUS TIMER</p>
      <p className="focus-duration">{focusDurationInMinutes}</p>
      <button
        onClick={decrementFocusDurationByOneMinute}
        className="focus-increment"
      >
        -
      </button>
      <button
        onClick={incrementFocusDurationByOneMinute}
        className="focus-increment"
      >
        +
      </button>
    </div>
  )
}

export default Focus
