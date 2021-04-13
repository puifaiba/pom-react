import React from "react"
import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format"

momentDurationFormatSetup(moment)

const RemainingTime = ({
  remainingTime,
  handleStartStopClick,
  timerLabel,
  startStopButtonLabel,
}) => {
  const formattedRemainingTime = moment
    .duration(remainingTime, "s")
    .format("mm:ss", {trim: false})

  return (
    <div className="remaining-time-container">
      <div className="timer-label">{timerLabel}</div>
      <div className="remaining-time">{formattedRemainingTime}</div>
      <button onClick={handleStartStopClick}>{startStopButtonLabel}</button>
    </div>
  )
}

export default RemainingTime
