import { useTimer } from 'react-timer-hook'
import './App.css'
import { CustomButton } from './components/CutomButton'
import { useState, useEffect } from 'react'

const PomodoroTimer = () => {
  const workDuration = 25 * 60 // 25 minutes
  const breakDuration = 5 * 60 // 5 minutes
  const [isWorkTime, setIsWorkTIme] = useState(true)
  const enableAutoStart = false

  const getExpiryTimestamp = (): Date => {
    const time = new Date()
    time.setSeconds(
      time.getSeconds() + (isWorkTime ? workDuration : breakDuration)
    )
    return time
  }

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    autoStart: enableAutoStart,
    onExpire: () => setIsWorkTIme(!isWorkTime),
  })

  useEffect(() => {
    restart(getExpiryTimestamp(), enableAutoStart)
  }, [isWorkTime])

  const start = () => {
    if (isRunning) return
    resume()
  }

  const stop = () => {
    if (!isRunning) return
    pause()
  }

  // 0詰め
  const formattesMunites = minutes.toString().padStart(2, '0')
  const formattesSeconds = seconds.toString().padStart(2, '0')

  return (
    <>
      <div className="text-[12rem] font-bold mb-8">
        <span>{formattesMunites}</span>:<span>{formattesSeconds}</span>
      </div>
      <div className="flex justify-center gap-8">
        <CustomButton onClick={start}>Start</CustomButton>
        <CustomButton onClick={stop}>Stop</CustomButton>
      </div>
    </>
  )
}

const App = () => {
  return (
    <>
      <PomodoroTimer />
    </>
  )
}

export default App
