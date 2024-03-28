'use client'

import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import LogoDevIcon from '@mui/icons-material/LogoDev'

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        borderBottom: '1px solid #ccc',
        background: '#fff',
        color: '#000',
        boxShadow: 'none',
        p: '12px',
      }}
    >
      <Toolbar>
        <LogoDevIcon
          sx={{ fontSize: 80, marginRight: '20px' }}
          color="action"
        />
        <Typography variant="h3" noWrap>
          배터리 모니터링
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
