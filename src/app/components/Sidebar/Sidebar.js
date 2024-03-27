import React from 'react'
import { Drawer, List, ListItem, ListItemText } from '@mui/material'
import Link from 'next/link'

const drawerWidth = 200

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary="Home" sx={{ textAlign: 'center' }} />
          </ListItem>
        </Link>
        <Link href="/page2" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary="Page2" sx={{ textAlign: 'center' }} />
          </ListItem>
        </Link>
        <Link href="/page3" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary="Page3" sx={{ textAlign: 'center' }} />
          </ListItem>
        </Link>
        <Link href="/page4" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary="Page4" sx={{ textAlign: 'center' }} />
          </ListItem>
        </Link>
        <Link href="/page5" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary="Page5" sx={{ textAlign: 'center' }} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

export default Sidebar
