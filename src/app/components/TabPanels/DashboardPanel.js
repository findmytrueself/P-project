import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'

const DashboardPanel = () => {
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
            <Typography sx={{ p: 1.5 }} variant="h6" component="div">
              총 알람상태
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ padding: '0 12px', borderBottom: '1px solid #ccc' }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ p: 1.5, mr: 6 }} variant="h6" component="div">
                배터리1
              </Typography>
              <Divider orientation="vertical" />
              <Typography sx={{ p: 1.5 }} variant="h7" component="div">
                10
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{ minWidth: '150px', maxHeight: '40px', marginTop: '8px' }}
            >
              내부보기
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ padding: '0 12px', borderBottom: '1px solid #ccc' }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ p: 1.5, mr: 6 }} variant="h6" component="div">
                배터리2
              </Typography>
              <Divider orientation="vertical" />
              <Typography sx={{ p: 1.5 }} variant="h7" component="div">
                10
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{ minWidth: '150px', maxHeight: '40px', marginTop: '8px' }}
            >
              내부보기
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ padding: '0 12px', borderBottom: '1px solid #ccc' }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ p: 1.5, mr: 6 }} variant="h6" component="div">
                배터리3
              </Typography>
              <Divider orientation="vertical" />
              <Typography sx={{ p: 1.5 }} variant="h7" component="div">
                10
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{ minWidth: '150px', maxHeight: '40px', marginTop: '8px' }}
            >
              내부보기
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ padding: '0 12px' }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ p: 1.5, mr: 6 }} variant="h6" component="div">
                배터리4
              </Typography>
              <Divider orientation="vertical" />
              <Typography sx={{ p: 1.5 }} variant="h7" component="div">
                10
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{ minWidth: '150px', maxHeight: '40px', marginTop: '8px' }}
            >
              내부보기
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DashboardPanel
