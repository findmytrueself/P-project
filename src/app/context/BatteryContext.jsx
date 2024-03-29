'use client'
import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

const BatteryContext = createContext({
  battery: null,
  setBatteryInfo: () => {},
})

export function useBatteryContext() {
  return useContext(BatteryContext)
}

export const BatteryContextProvider = ({ children }) => {
  const [batteryInfo, setBatteryInfo] = useState([
    {
      label: '배터리1',
      value: 10,
      onOff: 'on',
      batteryState: { label: '배터리1', a: '200.86V', b: 16.2, c: '0.3A' },
      alarmHistory: [
        { timestamp: '2023-12-01 16:11:00' },
        { timestamp: '2023-12-01 16:11:00' },
        { timestamp: '2023-12-01 16:11:00' },
      ],
    },
    {
      label: '배터리2',
      value: 5,
      onOff: 'off',
      batteryState: { label: '배터리2', a: '200.86V', b: 16.2, c: '0.3A' },
      alarmHistory: [
        { timestamp: '2023-12-01 16:11:00' },
        { timestamp: '2023-12-01 16:11:00' },
        { timestamp: '2023-12-01 16:11:00' },
      ],
    },
    {
      label: '배터리3',
      value: 10,
      onOff: 'on',
      batteryState: { label: '배터리3', a: '200.86V', b: 16.2, c: '0.3A' },
      alarmHistory: [
        { timestamp: '2023-12-01 16:11:00' },
        { timestamp: '2023-12-01 16:11:00' },
        { timestamp: '2023-12-01 16:11:00' },
      ],
    },
    {
      label: '배터리4',
      value: 8,
      onOff: 'off',
      batteryState: { label: '배터리4', a: '200.86V', b: 16.2, c: '0.3A' },
      alarmHistory: [
        { timestamp: '2023-12-01 16:11:00' },
        { timestamp: '2023-12-01 16:11:00' },
        { timestamp: '2023-12-01 16:11:00' },
      ],
    },
  ])
  useEffect(() => {
    //* battery data fetching
  }, [])

  return (
    <BatteryContext.Provider value={{ batteryInfo, setBatteryInfo }}>
      {children}
    </BatteryContext.Provider>
  )
}
