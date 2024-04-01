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
      batteryState: {
        label: '배터리1',
        전압: '200.86V',
        온도: 16.2,
        저항: '0.3A',
        SOC: '0.1A',
        SOH: '0.2A',
      },
      alarmHistory: [
        { 순번: 1, 발생시각: '2023-12-01 16:11:00', 구분: '전압 초과' },
        { 순번: 2, 발생시각: '2023-12-01 16:11:00', 구분: '저항 초과' },
        { 순번: 3, 발생시각: '2023-12-01 16:11:00', 구분: '전압 미달' },
      ],
    },
    {
      label: '배터리2',
      value: 5,
      onOff: 'off',
      batteryState: {
        label: '배터리2',
        전압: '200.86V',
        온도: 16.2,
        저항: '0.3A',
        SOC: '0.1A',
        SOH: '0.2A',
      },
      alarmHistory: [
        { 순번: 1, 발생시각: '2023-12-01 16:11:00', 구분: '전압 초과' },
        { 순번: 2, 발생시각: '2023-12-01 16:11:00', 구분: '저항 초과' },
        { 순번: 3, 발생시각: '2023-12-01 16:11:00', 구분: '전압 미달' },
      ],
    },
    {
      label: '배터리3',
      value: 10,
      onOff: 'on',
      batteryState: {
        label: '배터리3',
        전압: '200.86V',
        온도: 16.2,
        저항: '0.3A',
        SOC: '0.1A',
        SOH: '0.2A',
      },
      alarmHistory: [
        { 순번: 1, 발생시각: '2023-12-01 16:11:00', 구분: '전압 초과' },
        { 순번: 2, 발생시각: '2023-12-01 16:11:00', 구분: '저항 초과' },
        { 순번: 3, 발생시각: '2023-12-01 16:11:00', 구분: '전압 미달' },
      ],
    },
    {
      label: '배터리4',
      value: 8,
      onOff: 'off',
      batteryState: {
        label: '배터리4',
        전압: '200.86V',
        온도: 16.2,
        저항: '0.3A',
        SOC: '0.1A',
        SOH: '0.2A',
      },
      alarmHistory: [
        { 순번: 1, 발생시각: '2023-12-01 16:11:00', 구분: '전압 초과' },
        { 순번: 2, 발생시각: '2023-12-01 16:11:00', 구분: '저항 초과' },
        { 순번: 3, 발생시각: '2023-12-01 16:11:00', 구분: '전압 미달' },
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
