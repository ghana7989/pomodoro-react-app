import React, { useRef, useState } from 'react';
import './App.css';

export default function App() {
  const [title, setTitle] = useState("Let the Countdown begin!!!");
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef(null)

  const startTimer = () => {
    if (intervalRef.current !== null) return
    setIsRunning(true)
    setTitle(title => "You are doing great")
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimeer()
        return 0;
      })
    }, 1000)
  }
  const stopTimer = () => {
    if (intervalRef.current === null) return
    setIsRunning(false)
    clearInterval(intervalRef.current)
    setTitle(title => "Keep it up")
    intervalRef.current = null

  }

  const resetTimeer = () => {
    clearInterval(intervalRef.current)
    setTimeLeft(timeLeft => 25 * 60)
    setTitle(title => "Wanna go another round?")
    intervalRef.current = null
    setIsRunning(false)
  }

  const updateHead = (minutes, seconds) => {
    const head = document.getElementsByTagName("title")
    console.log(head)
    head[0].innerHTML = `Pomodoro ${minutes} : ${seconds}`
    console.log(head[0].innerHTML)
  }

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft - minutes * 60).toString().padStart(2, "0");
  updateHead(minutes, seconds)


  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>
          {minutes}
        </span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimeer}>Reset</button>
      </div>
    </div>
  );
}
