import React, {useState, useEffect, useRef} from "react"
// import "./Timer.css"
import Break from "../components/Break"
import Focus from "../components/Focus"
import RemainingTime from "../components/RemainingTime"

const Timer = (props) => {
  const [currentIntervalType, setCurrentIntervalType] = useState("Focus")
  const [intervalId, setIntervalId] = useState(null)
  const [focusDuration, setFocusDuration] = useState(1500)
  const [breakDuration, setBreakDuration] = useState(300)
  const [remainingTime, setRemainingTime] = useState(focusDuration)
  const audioElement = useRef(null)

  useEffect(() => {
    setRemainingTime(focusDuration)
  }, [focusDuration])

  const decrementBreakDurationByOneMinute = () => {
    const newBreakDuration = breakDuration - 60
    if (newBreakDuration > 0) {
      setBreakDuration(newBreakDuration)
    }
  }

  const incrementBreakDurationByOneMinute = () => {
    const newBreakDuration = breakDuration + 60
    if (newBreakDuration <= 3600) {
      setBreakDuration(breakDuration + 60)
    }
  }

  const decrementFocusDurationByOneMinute = () => {
    const newFocusDuration = focusDuration - 60
    if (newFocusDuration > 0) {
      setFocusDuration(newFocusDuration)
    }
  }

  const incrementFocusDurationByOneMinute = () => {
    const newFocusDuration = focusDuration + 60
    if (newFocusDuration <= 3600) {
      setFocusDuration(focusDuration + 60)
    }
  }

  const handleResetButtonClick = () => {
    clearInterval(intervalId)
    setIntervalId(null)
    setCurrentIntervalType("Focus")
    setFocusDuration(1500)
    setBreakDuration(300)
    setRemainingTime(1500)
    audioElement.current.load()
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
          audioElement.current.play()
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
    <div className="timer">
      {props.timerShown ? (
        <div>
          <div className="timer-container">
            <Focus
              focusDuration={focusDuration}
              decrementFocusDurationByOneMinute={
                decrementFocusDurationByOneMinute
              }
              incrementFocusDurationByOneMinute={
                incrementFocusDurationByOneMinute
              }
            />
            <br />
            <Break
              breakDuration={breakDuration}
              decrementBreakDurationByOneMinute={
                decrementBreakDurationByOneMinute
              }
              incrementBreakDurationByOneMinute={
                incrementBreakDurationByOneMinute
              }
            />
            <br />
            <RemainingTime
              timerLabel={currentIntervalType}
              handleStartStopClick={handleStartStopClick}
              startStopButtonLabel={isStarted ? "STOP" : "START"}
              remainingTime={remainingTime}
            />
            <button className="reset-button" onClick={handleResetButtonClick}>
              RESET
            </button>
            <audio id="bark" ref={audioElement}>
              <source
                src="https://onlineclock.net/audio/options/dog-barking.mp3"
                type="audio/mpeg"
              />
            </audio>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Timer
