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
      <div className="focus-label">FOCUS TIMER</div>
      <div className="duration">{focusDurationInMinutes}</div>
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
