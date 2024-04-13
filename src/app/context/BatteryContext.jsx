'use client'
import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { clientAxiosInstance } from '../api/axios'

const BatteryContext = createContext({
  serviceStatus: null,
  office: null,
  setOffice: () => {},
  station: null,
  setStation: () => {},
  rru: null,
  setRru: () => {},
  rruInfo: null,
  setRruInfo: () => {},
  batteryStatus: null,
  setBatteryStatus: () => {},
})

export function useBatteryContext() {
  return useContext(BatteryContext)
}

export const BatteryContextProvider = ({ children }) => {
  const [serviceStatus, setServiceStatus] = useState([])
  const [office, setOffice] = useState(null)
  const [station, setStation] = useState(null)
  const [rru, setRru] = useState(null)
  const [rruInfo, setRruInfo] = useState(null)
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
        office,
        setOffice,
        station,
        setStation,
        rru,
        setRru,
        rruInfo,
        setRruInfo,
        batteryStatus,
        setBatteryStatus,
      }}
    >
      {children}
    </BatteryContext.Provider>
  )
}
