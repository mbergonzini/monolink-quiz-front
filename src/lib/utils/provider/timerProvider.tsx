import React, { createContext, useMemo, useState, useEffect} from 'react'

export interface TimerContextType {
  time: number
  reset: () => void
  start: () => void
}
export const TimerContext = createContext<TimerContextType>({
  time: 0,
  reset: () => {},
  start: () => {}
})

interface TimerProviderProps {
  children: React.ReactNode
}
export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [time, setTime] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date | null>(null)

  const reset = () => {
    setTime(0)
    window.localStorage.removeItem('startDate')
    setStartDate(null)
  }

  useEffect(() => {
    const localStartDate = window.localStorage.getItem('startDate')
    if (localStartDate) {
      setStartDate(new Date(localStartDate))
    }
  }, [])

  const start = () => {
    if (!startDate) {
      window.localStorage.setItem('startDate', new Date().toString())
      setStartDate(new Date())
    }
  }

  useEffect(() => {
    if (startDate) {
      const interval = setInterval(() => {
        setTime((new Date().getTime() - startDate.getTime()) / 1000)
      }, 1)
      return () => clearInterval(interval)
    }
  }, [startDate])



  const context = useMemo(
    () => ({
      time,
      reset,
      start
    }),
    [time]
  )

  return (
    <>
      <TimerContext.Provider value={context}>{children}</TimerContext.Provider>
    </>
  )
}
