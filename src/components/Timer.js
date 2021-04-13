import React, {useState, useEffect} from "react"
// import "./Timer.css"
import Break from "./Break"
import Focus from "./Focus"
import RemainingTime from "./RemainingTime"

const Timer = () => {
  const [focusDuration, setFocusDuration] = useState(1500)
  const [breakDuration, setBreakDuration] = useState(300)

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
      />
    </div>
  )
}

export default Timer
