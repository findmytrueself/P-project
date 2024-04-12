'use client'
import { Tab, Tabs, Container } from '@mui/material'
import { useState } from 'react'
import Loading from './components/Loading'
import TabPanels from './components/TabPanels'
import { useBatteryContext } from './context/BatteryContext'

export default function Home() {
  const [value, setValue] = useState(0)
  const { batteryStatus } = useBatteryContext()

  return (
    <Container maxWidth="xl">
      {!batteryStatus ? <Loading /> : null}
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <Tab
          sx={{
            border: '1px solid rgba(224, 224, 224, 1)',
            minWidth: '150px',
            minHeight: '40px',
          }}
          label="대시보드"
          value={0}
        />
        <Tab
          sx={{
            border: '1px solid rgba(224, 224, 224, 1)',
            minWidth: '150px',
            minHeight: '40px',
          }}
          label="알람"
          value={1}
        />
        <Tab
          sx={{
            border: '1px solid rgba(224, 224, 224, 1)',
            minWidth: '150px',
            minHeight: '40px',
          }}
          label="측정"
          value={2}
        />
      </Tabs>
      <TabPanels tab={value} />
    </Container>
  )
}
