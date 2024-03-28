'use client'
import { Tab, Tabs, Container, Box } from '@mui/material'
import { useState } from 'react'
import TabPanels from './components/TabPanels'

export default function Home() {
  const [value, setValue] = useState(0)

  return (
    <Container maxWidth="xl">
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
            border: '1px solid #ccc',
            minWidth: '150px',
            minHeight: '40px',
          }}
          label="대시보드"
          value={0}
        />
        <Tab
          sx={{
            border: '1px solid #ccc',
            minWidth: '150px',
            minHeight: '40px',
          }}
          label="알람"
          value={1}
        />
        <Tab
          sx={{
            border: '1px solid #ccc',
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
