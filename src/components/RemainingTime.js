import React, {useState, useEffect} from "react"
import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format"

momentDurationFormatSetup(moment)

const RemainingTime = ({focusDuration, breakDuration}) => {
  const [currentIntervalType, setCurrentIntervalType] = useState("Focus")
  const [intervalId, setIntervalId] = useState(null)
  const [remainingTime, setRemainingTime] = useState(focusDuration)
  const formattedRemainingTime = moment
    .duration(remainingTime, "s")
    .format("mm:ss", {trim: false})

  useEffect(() => {
    setRemainingTime(focusDuration)
  }, [focusDuration])

  const isStarted = intervalId !== null

  const handleStartStopClick = () => {
    if (isStarted) {
      clearInterval(intervalId)
      setIntervalId(null)
    } else {
      const newIntervalId = setInterval(() => {
        setRemainingTime((prevRemainingTime) => {
          const newRemainingTime = prevRemainingTime - 1
          if (newRemainingTime >= 0) {
            return prevRemainingTime - 1
          }
          if (currentIntervalType === "Focus") {
            setCurrentIntervalType("Break")
            setRemainingTime(breakDuration)
          } else if (currentIntervalType === "Break") {
            setCurrentIntervalType("Session")
            setRemainingTime(focusDuration)
          } else {
            return prevRemainingTime
          }
        })
      }, 1000)
      setIntervalId(newIntervalId)
    }
  }

  return (
    <div className="remaining-time-container">
      <div className="timer-label">{currentIntervalType}</div>
      <div className="remaining-time">{formattedRemainingTime}</div>
      <button onClick={handleStartStopClick}>
        {isStarted ? "STOP" : "START"}
      </button>
    </div>
  )
}

export default RemainingTime
