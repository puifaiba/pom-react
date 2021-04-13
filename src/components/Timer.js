import React, {useState, useEffect} from "react"
// import "./Timer.css"
import Break from "./Break"
import Focus from "./Focus"
import RemainingTime from "./RemainingTime"

const Timer = () => {
  const [currentIntervalType, setCurrentIntervalType] = useState("Focus")
  const [intervalId, setIntervalId] = useState(null)
  const [focusDuration, setFocusDuration] = useState(1500)
  const [breakDuration, setBreakDuration] = useState(300)
  const [remainingTime, setRemainingTime] = useState(focusDuration)

  useEffect(() => {
    setRemainingTime(focusDuration)
  }, [focusDuration])

  const decrementBreakDurationByOneMinute = () => {
    const newBreakDuration = breakDuration - 60

    if (newBreakDuration < 0) {
      setBreakDuration(0)
    } else {
      setBreakDuration(newBreakDuration)
    }
  }

  const incrementBreakDurationByOneMinute = () => {
    setBreakDuration(breakDuration + 60)
  }

  const decrementFocusDurationByOneMinute = () => {
    const newFocusDuration = focusDuration - 60

    if (newFocusDuration < 0) {
      setFocusDuration(0)
    } else {
      setFocusDuration(newFocusDuration)
    }
  }

  const incrementFocusDurationByOneMinute = () => {
    setFocusDuration(focusDuration + 60)
  }

  const handleResetButtonClick = () => {
    clearInterval(intervalId)
    setIntervalId(null)
    setCurrentIntervalType("Focus")
    setFocusDuration(1500)
    setBreakDuration(300)
    setRemainingTime(1500)
  }

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
    <div className="timer-container">
      <span>TIMER</span>
      <Focus
        focusDuration={focusDuration}
        decrementFocusDurationByOneMinute={decrementFocusDurationByOneMinute}
        incrementFocusDurationByOneMinute={incrementFocusDurationByOneMinute}
      />
      <Break
        breakDuration={breakDuration}
        decrementBreakDurationByOneMinute={decrementBreakDurationByOneMinute}
        incrementBreakDurationByOneMinute={incrementBreakDurationByOneMinute}
      />
      <RemainingTime
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        timerLabel={currentIntervalType}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted ? "STOP" : "START"}
        remainingTime={remainingTime}
      />
      <button className="reset-button" onClick={handleResetButtonClick}>
        RESET
      </button>
    </div>
  )
}

export default Timer
