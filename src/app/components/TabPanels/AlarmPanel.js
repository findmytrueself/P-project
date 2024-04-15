import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useBatteryContext } from '../../context/BatteryContext'
import { clientAxiosInstance } from '../../api/axios'
import { utcToKrTime } from '../../utils/utils'

const AlarmPanel = () => {
  const { batteryStatus } = useBatteryContext()
  const [alarmHistory, setAlarmHistory] = useState([])
  const [batteryNumber, setBatteryNumber] = useState(1)

  useEffect(() => {
    if (batteryStatus) {
      const { rruId, alarmSummaries } = batteryStatus
      const getAlarmHistory = async () => {
        try {
          const alarmHistoryData = await clientAxiosInstance.get(
            `/rrus/${rruId}/${alarmSummaries[batteryNumber].stringNumber}/${alarmSummaries[batteryNumber].batteryNumber}/alarms`
          )
          setAlarmHistory(alarmHistoryData.data)
        } catch (e) {
          console.error(e)
        }
      }
      getAlarmHistory()
    }
  }, [batteryStatus, batteryNumber])

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

          {batteryStatus &&
            batteryStatus?.batteryMeasures &&
            Object.values(batteryStatus?.alarmSummaries).length > 0 &&
            Object.values(batteryStatus?.alarmSummaries).map((alarm) => (
              <Stack
                key={alarm.batteryNumber}
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
                      fontWeight: 400,
                      fontSize: '0.875rem',
                      lineHeight: '2rem',
                    }}
                    variant="h7"
                    component="div"
                  >
                    {`배터리${alarm.batteryNumber}`}
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
                    {alarm.alarmCount}
                  </Typography>
                </Box>
              </Stack>
            ))}
        </CardContent>
      </Card>

      <TableContainer
        sx={{
          mt: 4,
          border: '1px solid rgba(224, 224, 224, 1)',
          boxShadow: 'none',
        }}
        component={Paper}
      >
        <Table
          key={batteryNumber}
          stickyHeader
          aria-label={`배터리${batteryNumber} 알람이력`}
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={columns.length} align="left">
                <FormControl
                  size="small"
                  sx={{ minWidth: 160 }}
                  disabled={!batteryStatus}
                  // error={!batteryStatus}
                >
                  <InputLabel id="demo-simple-select-label">{`배터리${batteryNumber} 알람이력`}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-required"
                    value={batteryNumber}
                    label={`배터리${batteryNumber} 알람이력`}
                    onChange={(e) => setBatteryNumber(e.target.value)}
                  >
                    {batteryStatus &&
                      batteryStatus.alarmSummaries &&
                      Object.values(batteryStatus.alarmSummaries).length > 0 &&
                      Object.values(batteryStatus.alarmSummaries).map(
                        (battery) => (
                          <MenuItem
                            key={battery.batteryNumber}
                            value={battery.batteryNumber}
                          >{`배터리${battery.batteryNumber}`}</MenuItem>
                        )
                      )}
                  </Select>
                  <FormHelperText>
                    {!batteryStatus ? `좌측의 RRU를 선택해주세요.` : ''}
                  </FormHelperText>
                </FormControl>
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
            {alarmHistory.length === 0 ? (
              <Typography
                sx={{
                  ml: 0.5,
                  p: 1.75,
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  lineHeight: '1.43',
                }}
              >
                배터리를 선택해주세요.
              </Typography>
            ) : null}
            {alarmHistory &&
              alarmHistory?.list?.map((history, idx) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                  {columns.map((column) => (
                    <TableCell>
                      {!history[column.id] && history[column.id] !== 0
                        ? idx + 1
                        : column.id === 'time'
                        ? utcToKrTime(history[column.id])
                        : history[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AlarmPanel

const columns = [
  { id: 'idx', label: '#순번', minWidth: 80 },
  { id: 'time', label: '발생시각', minWidth: 100 },
  { id: 'message', label: '구분', minWidth: 100 },
]
