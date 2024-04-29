import { useCallback, useEffect, useState } from 'react'

interface TimerSettings {
  expirySeconds: number
  onExpire?: () => void
}

interface TimerResult {
  seconds: number
  minutes: number
  start: () => void
  stop: () => void
  reset: (newExpirySeconds: number) => void
}

const useCountDownTimer = (settings: TimerSettings): TimerResult => {
  const [countTime, setCountTime] = useState<number>(settings.expirySeconds)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
    }
  }, [isRunning])

  const stop = useCallback(() => {
    if (isRunning) {
      setIsRunning(false)
    }
  }, [isRunning])

  const reset = useCallback((newExpirySeconds: number) => {
    setCountTime(newExpirySeconds)
    setIsRunning(false)
  }, [])

  const handleExpire = useCallback(() => {
    if (settings.onExpire) {
      settings.onExpire()
    }
  }, [settings])

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        if (countTime > 0) {
          setCountTime(countTime - 1)
        }

        if (countTime === 0) {
          clearInterval(intervalId)
          handleExpire()
        }
      }, 1000)

      return () => clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, countTime])

  return {
    seconds: countTime % 60,
    minutes: Math.trunc(countTime / 60),
    start: start,
    stop: stop,
    reset: reset,
  }
}

export { useCountDownTimer }
