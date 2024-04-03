import { Box } from '@mui/material'
import React from 'react'
import DashboardPanel from './DashboardPanel'
import AlarmPanel from './AlarmPanel'
import MeasurementPanel from './MeasurementPanel'

const TabPanels = ({ tab }) => {
  return (
    <Box sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
      {tab === 0 ? <DashboardPanel /> : null}
      {tab === 1 ? <AlarmPanel /> : null}
      {tab === 2 ? <MeasurementPanel /> : null}
    </Box>
  )
}

export default TabPanels
