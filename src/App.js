import React, { useState, useEffect } from 'react'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const App = () => {
  const [counterLengths, setCounterLengths] = useState({ break: 5, session: 25 })
  const [sessionCount, setSessionCount] = useState({ minutes: counterLengths.session, seconds: 0 })
  const [breakCount, setBreakCount] = useState({ minutes: counterLengths.break, seconds: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const reset = () => {
    setCounterLengths({ break: 5, session: 25 })
    setSessionCount({ seconds: 0, minutes: 25 })
    setBreakCount({ minutes: 5, seconds: 0 })
    setIsActive(false)
    setIsBreak(false)
  }

  const startCounting = () => {
    setIsActive(true)
  }

  const pauseCounting = () => {
    setIsActive(false)
  }

  const playSound = () => {
    const audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav")
    audio.play()
  }

  const decreaseSession = () => {
    if (!isActive) {
      if (counterLengths.session < 2) {
        showToast("Minimum length is 1")
      } else {
        const updatedMinutes = counterLengths.session - 1
        setCounterLengths({ ...counterLengths, session: updatedMinutes })
        setSessionCount({ seconds: 0, minutes: updatedMinutes })
      }
    } else {
      showToast("Pause clock before changing break or session length")
    }
  }

  const increaseSession = () => {
    if (!isActive) {
      if (counterLengths.session > 59) {
        showToast("Maximum length is 60")
      } else {
        const updatedMinutes = counterLengths.session + 1
        setCounterLengths({ ...counterLengths, session: updatedMinutes })
        setSessionCount({ seconds: 0, minutes: updatedMinutes })
      }

    } else {
      showToast("Pause clock before changing break or session length")
    }
  }

  const decreaseBreak = () => {
    if (!isActive) {
      if (counterLengths.break < 2) {
        showToast("Minimum length is 1")
      } else {
        const updatedMinutes = counterLengths.break - 1
        setCounterLengths({ ...counterLengths, break: updatedMinutes })
        setBreakCount({ seconds: 0, minutes: updatedMinutes })
      }

    } else {
      showToast("Pause clock before changing break or session length")
    }
  }

  const increaseBreak = () => {
    if (!isActive) {
      if (counterLengths.break > 59) {
        showToast("Maximum length is 60")
      } else {
        const updatedMinutes = counterLengths.break + 1
        setCounterLengths({ ...counterLengths, break: updatedMinutes })
        setBreakCount({ seconds: 0, minutes: updatedMinutes })
      }
    } else {
      showToast("Pause clock before changing break or session length")
    }
  }

  const formatCountNum = (num) => {
    if (num.toString().length < 2) return `0${num}`
    return num
  }

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage("")
    }, 3000)
  }

  useEffect(() => {
    const toggleCounter = () => {
      setIsBreak(!isBreak)
      playSound()
    }
    let interval = null
    if (isActive) {
      const count = isBreak ? breakCount : sessionCount
      let seconds = 0, minutes = 0
      if (count.seconds === 0) {
        if (count.minutes === 0) {
          minutes = isBreak ? counterLengths.break : counterLengths.session
          isBreak ? setBreakCount({ seconds: seconds, minutes: minutes }) : setSessionCount({ seconds: seconds, minutes: minutes })
          toggleCounter()
        } else {
          minutes = count.minutes - 1
          seconds = 59
        }
      } else {
        minutes = count.minutes
        seconds = count.seconds - 1
      }
      interval = setInterval(() => {
        isBreak ? setBreakCount({ seconds: seconds, minutes: minutes }) : setSessionCount({ seconds: seconds, minutes: minutes })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, sessionCount, breakCount, counterLengths, isBreak])

  return (
    <div className="App">
      <div className="container">
        <div className="clock-container">
          <h2>Pomodoro Clock</h2>
          <div className="row">
            <div className="break-controls-container">
              <h3>Break Length</h3>
              <div className="row">
                <span onClick={decreaseBreak}>
                  <i className="fas fa-minus"></i>
                </span>
                <p className="length-display">{counterLengths.break}</p>
                <span onClick={increaseBreak}>
                  <i className="fas fa-plus"></i>
                </span>
              </div>
            </div>
            <div className="session-controls-container">
              <h3>Session Length</h3>
              <div className="row">
                <span onClick={decreaseSession}>
                  <i className="fas fa-minus"></i>
                </span>
                <p className="length-display">{counterLengths.session}</p>
                <span onClick={increaseSession}>
                  <i className="fas fa-plus"></i>
                </span>
              </div>
            </div>
          </div>
          <p className="toast-text">{toastMessage}</p>
          <div className="timer-container">
            {isBreak ? <h3>Break</h3> : <h3>Session</h3>}
            <p className="time-left">{isBreak ? formatCountNum(breakCount.minutes) + ":" + formatCountNum(breakCount.seconds) : formatCountNum(sessionCount.minutes) + ":" + formatCountNum(sessionCount.seconds)}</p>
            <div className="row">
              <span onClick={startCounting}>
                <i className="fas fa-play"></i>
              </span>
              <span onClick={pauseCounting}>
                <i className="fas fa-pause"></i>
              </span>
              <span onClick={reset}>
                <i className="fas fa-sync-alt"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
