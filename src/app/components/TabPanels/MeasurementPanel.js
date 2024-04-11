import {
  Box,
  Tab,
  Tabs,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useBatteryContext } from '../../context/BatteryContext'
import { BarChart } from '@mui/x-charts'
import { clientAxiosInstance } from '../../api/axios'

const getTab2ChartKey = (tab2Value) => {
  switch (tab2Value) {
    case 0:
      return { key: 'voltage', label: '전압(V)', color: '#4e79a7' }
    case 1:
      return { key: 'temperature', label: '온도(°C)', color: '#f28e2c' }
    case 2:
      return { key: 'resistance', label: '저항(mΩ)', color: '#e15759' }
    case 3:
      return { key: 'soc', label: 'SOC(%)', color: '#76b7b2' }
    case 4:
      return { key: 'soh', label: 'SOH(%)', color: '#59a14f' }
    default:
  }
}

const MeasurementPanel = () => {
  const [tab1, setTab1] = useState(0)
  const [tab2, setTab2] = useState(0)
  const [convertedTab2, setConvertedTab2] = useState({
    key: '',
    label: '',
    color: '',
  })
  const { batteryStatus } = useBatteryContext()
  const [batteryNumber, setBatteryNumber] = useState(1)
  const [batteryHistory, setBatteryHistory] = useState([])
  const [chartSetting, setChartSetting] = useState({})

  useEffect(() => {
    if (batteryStatus) {
      const { rruId, batteryMeasures } = batteryStatus
      const getbatteryMeasureList = async () => {
        try {
          const batteryMeasureData = await clientAxiosInstance.get(
            `/rrus/${rruId}/${
              batteryMeasures[batteryNumber].stringNumber ?? 1
            }/${batteryMeasures[batteryNumber].batteryNumber}/list`
          )
          setBatteryHistory(batteryMeasureData.data.list)
        } catch (e) {
          console.error(e)
        }
      }
      getbatteryMeasureList()
    }
  }, [batteryStatus, batteryNumber])

  useEffect(() => {
    if (batteryStatus) {
      setChartSetting({
        yAxis: [
          {
            label: `배터리${batteryNumber} ${convertedTab2.label} 그래프`,
          },
        ],
        series: [
          {
            dataKey: convertedTab2.key,
            label: convertedTab2.label,
            color: convertedTab2.color,
          },
        ],
        height: 300,
      })
    }
  }, [batteryStatus, batteryHistory, batteryNumber, convertedTab2])

  useEffect(() => {
    const chartKey = getTab2ChartKey(tab2)
    setConvertedTab2(chartKey)
  }, [tab2])

  return (
    <Box sx={{ pt: '16px' }}>
      <Tabs
        value={tab1}
        onChange={(e, newValue) => setTab1(newValue)}
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

      <FormControl sx={{ m: 1 }}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={1}
        >
          {batteryStatus &&
          batteryStatus.batteryMeasures &&
          Object.values(batteryStatus.batteryMeasures).length > 0 ? (
            Object.values(batteryStatus.batteryMeasures).map((battery) => (
              <FormControlLabel
                key={battery.batteryNumber}
                value={battery.batteryNumber}
                control={<Radio />}
                label={`배터리${battery.batteryNumber}`}
                onChange={(e) => setBatteryNumber(e.target.value)}
                disabled={!batteryStatus}
              />
            ))
          ) : (
            <Typography
              sx={{
                p: 1,
                fontWeight: 400,
                fontSize: '0.875rem',
                lineHeight: '1.43',
              }}
            >
              RRU를 선택해주세요.
            </Typography>
          )}
        </RadioGroup>
      </FormControl>

      {tab1 === 0 ? (
        <>
          <Tabs
            value={tab2}
            onChange={(e, newValue) => setTab2(newValue)}
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
              label="전압(V)"
              value={0}
            />
            <Tab
              sx={{
                border: '1px solid rgba(224, 224, 224, 1)',
                minWidth: '150px',
                minHeight: '40px',
              }}
              label="온도(°C)"
              value={1}
            />
            <Tab
              sx={{
                border: '1px solid rgba(224, 224, 224, 1)',
                minWidth: '150px',
                minHeight: '40px',
                textTransform: 'none',
              }}
              label="저항(mΩ)"
              value={2}
            />
            <Tab
              sx={{
                border: '1px solid rgba(224, 224, 224, 1)',
                minWidth: '150px',
                minHeight: '40px',
              }}
              label="SOC(%)"
              value={3}
            />
            <Tab
              sx={{
                border: '1px solid rgba(224, 224, 224, 1)',
                minWidth: '150px',
                minHeight: '40px',
              }}
              label="SOH(%)"
              value={4}
            />
          </Tabs>
          {batteryHistory.length > 0 ? (
            <BarChart
              dataset={batteryHistory}
              xAxis={[
                {
                  scaleType: 'band',
                  dataKey: convertedTab2.key,
                  tickPlacement: 'middle',
                  tickLabelPlacement: 'middle',
                },
              ]}
              {...chartSetting}
            />
          ) : null}
        </>
      ) : null}
    </Box>
  )
}

export default MeasurementPanel
