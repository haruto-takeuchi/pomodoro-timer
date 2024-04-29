import { useEffect, useState } from 'react'
import './App.css'
import { CustomButton } from './components/CutomButton'
import { useCountDownTimer } from './hooks/useCountDownTimer'

const PomodoroTimer = () => {
  const workDuration = 25 * 60 // 25 minutes
  const breakDuration = 5 * 60 // 5 minutes
  const [isWorkTime, setIsWorkTime] = useState(true)

  const getExpiryTime = (): number => {
    return isWorkTime ? workDuration : breakDuration
  }

  const { seconds, minutes, start, stop, reset } = useCountDownTimer({
    expirySeconds: getExpiryTime(),
    onExpire: () => setIsWorkTime(!isWorkTime),
  })

  useEffect(() => {
    reset(getExpiryTime())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWorkTime])

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
