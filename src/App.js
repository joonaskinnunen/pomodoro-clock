import React, { useState } from 'react'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const App = () => {
  const [state, setState] = useState({ breakLength: 5, sessionLength: 30, isCounting: false })

  const incrementBreak = () => {
    setState({ ...state, breakLength: state.breakLength + 1 })
  }
  const decrementBreak = () => {
    setState({ ...state, breakLength: state.breakLength > 0 ? state.breakLength - 1 : 0 })
  }

  const incrementSession = () => {
    setState({ ...state, sessionLength: state.sessionLength + 1 })
  }
  const decrementSession = () => {
    setState({ ...state, sessionLength: state.sessionLength > 0 ? state.sessionLength - 1 : 0 })
  }

  const startCounting = () => {
    setState({ ...state, isCounting: true })
  }

  const pauseCounting = () => {
    setState({ ...state, isCounting: false })
  }

  const resetTimer = () => {
    setState({ ...state, breakLength: 5, sessionLength: 30 })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="clock-container">
          <h2>Pomodoro Clock</h2>
          <div className="row">
            <div className="break-controls-container">
              <h3>Break Length</h3>
              <div className="row">
                <span onClick={decrementBreak}>
                  <i className="fas fa-minus"></i>
                </span>
                <p>{state.breakLength}</p>
                <span onClick={incrementBreak}>
                  <i className="fas fa-plus"></i>
                </span>
              </div>
            </div>
            <div className="session-controls-container">
              <h3>Session Length</h3>
              <div className="row">
                <span onClick={decrementSession}>
                  <i className="fas fa-minus"></i>
                </span>
                <p>{state.sessionLength}</p>
                <span onClick={incrementSession}>
                  <i className="fas fa-plus"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="timer-container">
            <h3>Session</h3>
            <p className="time-left">{state.sessionLength}</p>
            <row>
              <span onClick={startCounting}>
                <i className="fas fa-play"></i>
              </span>
              <span onClick={pauseCounting}>
                <i className="fas fa-pause"></i>
              </span>
              <span onClick={resetTimer}>
                <i class="fas fa-sync-alt"></i>
              </span>
            </row>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
