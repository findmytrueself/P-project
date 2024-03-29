import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import React from 'react'
import { useBatteryContext } from '../../context/BatteryContext'

const AlarmPanel = () => {
  const { batteryInfo, setBatteryInfo } = useBatteryContext()
  const handleOnOff = (label, value) => {
    const updatedBatteryState = batteryInfo.map((battery) => {
      if (battery.label === label) {
        return {
          ...battery,
          onOff: value,
        }
      }
      return battery
    })
    setBatteryInfo(updatedBatteryState)
  }
  return (
    <Box sx={{ p: '16px' }}>
      <Card
        sx={{
          p: 0,
          boxShadow: 'none',
          border: '1px solid #ccc',
          '& .MuiCardContent-root:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ padding: '0 12px', borderBottom: '1px solid #ccc' }}>
            <Typography sx={{ p: 1.5 }} variant="h7" component="div">
              총 알람상태
            </Typography>
          </Box>

          {batteryInfo.map((battery) => (
            <Stack
              key={battery.label}
              direction="row"
              justifyContent="space-between"
              sx={{ padding: '0 12px', borderBottom: '1px solid #ccc' }}
            >
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ p: 1.5, mr: 6 }} variant="h7" component="div">
                  {battery.label}
                </Typography>
                <Divider orientation="vertical" />
                <Typography sx={{ p: 1.5 }} variant="h7" component="div">
                  {battery.value}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Button
                  variant="outlined"
                  sx={{
                    minWidth: '150px',
                    maxHeight: '40px',
                    marginTop: '4px',
                  }}
                >
                  팝업 표시
                </Button>
                <ToggleButtonGroup
                  sx={{ marginLeft: '10px' }}
                  color="primary"
                  value={battery.onOff}
                  exclusive
                  onChange={(e) => handleOnOff(battery.label, e.target.value)}
                  aria-label="배터리1"
                >
                  <ToggleButton
                    value="on"
                    sx={{
                      minWidth: '100px',
                      maxHeight: '40px',
                      marginTop: '4px',
                    }}
                  >
                    ON
                  </ToggleButton>
                  <ToggleButton
                    value="off"
                    sx={{
                      minWidth: '100px',
                      maxHeight: '40px',
                      marginTop: '4px',
                    }}
                  >
                    OFF
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Stack>
          ))}
        </CardContent>
      </Card>

      {batteryInfo.map((battery) => (
        <Card
          sx={{
            mt: 4,
            p: 0,
            boxShadow: 'none',
            border: '1px solid #ccc',
            '& .MuiCardContent-root:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ padding: '0 12px', borderBottom: '1px solid #ccc' }}>
              <Typography sx={{ p: 1.5 }} variant="h7" component="div">
                {`${battery.label} 알람이력`}
              </Typography>
            </Box>
            {battery.alarmHistory.map((alarmHistory, idx) => (
              <Stack
                key={battery.label}
                direction="row"
                justifyContent="space-between"
                sx={{ padding: '0 12px', borderBottom: '1px solid #ccc' }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{ p: 1.5, mr: 6 }}
                    variant="h7"
                    component="div"
                  >
                    {`#${idx}`}
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography sx={{ p: 1.5 }} variant="h7" component="div">
                    {alarmHistory.timestamp}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default AlarmPanel
