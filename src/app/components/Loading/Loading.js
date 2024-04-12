import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        zIndex: 1000,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  )
}

export default Loading
