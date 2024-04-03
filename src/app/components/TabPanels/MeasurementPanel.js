import {
  Box,
  Tab,
  Tabs,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import React, { useState } from 'react'
import { useBatteryContext } from '../../context/BatteryContext'
import { BarChart } from '@mui/x-charts'

const MeasurementPanel = () => {
  const [value, setValue] = useState(0)
  const { batteryInfo } = useBatteryContext()

  return (
    <Box sx={{ pt: '16px' }}>
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
          label="그래프"
          value={0}
        />
        <Tab
          sx={{
            border: '1px solid rgba(224, 224, 224, 1)',
            minWidth: '150px',
            minHeight: '40px',
          }}
          label="리스트"
          value={1}
        />
        <Tab
          sx={{
            border: '1px solid rgba(224, 224, 224, 1)',
            minWidth: '150px',
            minHeight: '40px',
          }}
          label="통계"
          value={2}
        />
      </Tabs>

      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {batteryInfo.map((battery) => (
            <FormControlLabel
              key={battery.batteryNumber}
              value={battery.batteryNumber}
              control={<Radio />}
              label={battery.batteryNumber}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {value === 0 ? (
        <BarChart
          xAxis={[
            { scaleType: 'band', data: ['group A', 'group B', 'group C'] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        />
      ) : null}
    </Box>
  )
}

export default MeasurementPanel
