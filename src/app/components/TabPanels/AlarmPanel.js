import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material'
import React from 'react'
import { useBatteryContext } from '../../context/BatteryContext'

const columns = [
  { id: '순번', label: '순번', minWidth: 100 },
  { id: '발생시각', label: '발생시각', minWidth: 170 },
  { id: '구분', label: '구분', minWidth: 100 },
]

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
          border: '1px solid rgba(224, 224, 224, 1)',
          '& .MuiCardContent-root:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              padding: '0 12px',
              borderBottom: '1px solid rgba(224, 224, 224, 1)',
            }}
          >
            <Typography
              sx={{
                p: 1,
                fontWeight: 500,
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
              }}
              variant="h7"
              component="div"
            >
              총 알람상태
            </Typography>
          </Box>

          {batteryInfo.map((battery) => (
            <Stack
              key={battery.batteryNumber}
              direction="row"
              justifyContent="space-between"
              sx={{
                padding: '0 12px',
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Typography
                  sx={{
                    p: 1,
                    mr: 6,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    lineHeight: '2rem',
                  }}
                  variant="h7"
                  component="div"
                >
                  {battery.batteryNumber}
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  sx={{
                    p: 1,
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    lineHeight: '2rem',
                  }}
                  variant="h7"
                  component="div"
                >
                  {battery.value}
                </Typography>
              </Box>
            </Stack>
          ))}
        </CardContent>
      </Card>

      {batteryInfo.map((battery) => (
        <TableContainer sx={{ mt: 4 }} component={Paper}>
          <Table
            key={battery.batteryNumber}
            stickyHeader
            aria-label={`${battery.batteryNumber} 알람이력`}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={columns.length} align="left">
                  {`${battery.batteryNumber} 알람이력`}
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {battery.alarmHistory.map((history) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={battery.label}
                >
                  {columns.map((column) => (
                    <TableCell>{history[column.id]}</TableCell>
                  ))}
                  {console.log(history, 'history')}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Box>
  )
}

export default AlarmPanel
