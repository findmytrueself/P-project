import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import React from 'react'
import { useBatteryContext } from '../../context/BatteryContext'

const columns = [
  { id: 'label', label: '배터리', minWidth: 170 },
  { id: '전압', label: '전압', minWidth: 100 },
  { id: '온도', label: '온도', minWidth: 100 },
  { id: '저항', label: '저항', minWidth: 100 },
  { id: 'SOC', label: 'SOC', minWidth: 100 },
  { id: 'SOH', label: 'SOH', minWidth: 100 },
]

const DashboardPanel = () => {
  const { batteryInfo } = useBatteryContext()

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
              <Button
                variant="outlined"
                sx={{ minWidth: '150px', maxHeight: '40px', marginTop: '4px' }}
              >
                내부보기
              </Button>
            </Stack>
          ))}
        </CardContent>
      </Card>

      <TableContainer sx={{ mt: 4 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={columns.length} align="left">
                배터리 상태
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
            {batteryInfo.map((battery) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={battery.label}>
                {columns.map((column) => (
                  <TableCell key={column.id} align="left">
                    {battery.batteryState[column.id]}
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

export default DashboardPanel
