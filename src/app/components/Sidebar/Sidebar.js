'use client'

import React from 'react'
import { Box, Drawer } from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'

const drawerWidth = 240

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        zIndex: 0,
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
      <Box sx={{ margin: '6px' }}>
        <SimpleTreeView sx={{ marginTop: '120px' }} multiSelect>
          <TreeItem itemId="서울정보통신사무소" label="서울정보통신사무소">
            <TreeItem itemId="서울정보통신사무소-1" label="1번 RRU" />
            <TreeItem itemId="서울정보통신사무소-2" label="2번 RRU" />
          </TreeItem>
          <TreeItem itemId="청량리" label="청량리">
            <TreeItem itemId="청량리-1" label="1번 RRU" />
            <TreeItem itemId="청량리-2" label="2번 RRU" />
          </TreeItem>
          <TreeItem itemId="의정부" label="의정부">
            <TreeItem itemId="의정부-1" label="1번 RRU" />
            <TreeItem itemId="의정부-2" label="2번 RRU" />
          </TreeItem>
        </SimpleTreeView>
      </Box>
    </Drawer>
  )
}

export default Sidebar
