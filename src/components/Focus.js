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
        className="focus-increment ui teal basic icon button"
      >
        <i aria-hidden="true" class="minus icon"></i>
      </button>
      <button
        onClick={incrementFocusDurationByOneMinute}
        className="focus-increment ui teal basic icon button"
      >
        <i aria-hidden="true" class="plus icon"></i>
      </button>
    </div>
  )
}

export default Focus
