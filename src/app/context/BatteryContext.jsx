'use client'
import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { clientAxiosInstance } from '../api/axios'

const BatteryContext = createContext({
  serviceStatus: null,
  batteryStatus: null,
  setBatteryStatus: () => {},
  alarmHistory: null,
  setAlarmHistory: () => {},
})

export function useBatteryContext() {
  return useContext(BatteryContext)
}

export const BatteryContextProvider = ({ children }) => {
  const [serviceStatus, setServiceStatus] = useState([])
  const [batteryStatus, setBatteryStatus] = useState(null)

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await clientAxiosInstance.get('/status')
        setServiceStatus(res.data)
      } catch (e) {
        console.error(e, '요청 실패')
      }
    }

    getStatus()
  }, [])

  return (
    <BatteryContext.Provider
      value={{
        serviceStatus,
        batteryStatus,
        setBatteryStatus,
      }}
    >
      {children}
    </BatteryContext.Provider>
  )
}
