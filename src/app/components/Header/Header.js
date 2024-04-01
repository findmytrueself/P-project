'use client'

import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'

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
        <Image
          src="/arloo.png"
          width={80}
          height={80}
          style={{ marginRight: '24px' }}
        />
        <Typography variant="h4" noWrap sx={{ fontWeight: 600 }}>
          배터리 모니터링
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
