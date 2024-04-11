'use client'

import React from 'react'
import { Box, Drawer } from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { useBatteryContext } from '../../context/BatteryContext'
import { clientAxiosInstance } from '../../api/axios'

const drawerWidth = 240

const Sidebar = () => {
  const { serviceStatus, setBatteryStatus } = useBatteryContext()
  const handleChangeBatteryStatus = async (rruId) => {
    try {
      const getBatteryStatus = await clientAxiosInstance.get(`/rrus/${rruId}`)
      setBatteryStatus(getBatteryStatus.data)
    } catch (e) {
      console.error(e, 'error')
    }
  }
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
          <TreeItem
            key={serviceStatus.officeName}
            itemId={serviceStatus.officeName ?? '서울정보통신사무소'}
            label={serviceStatus.officeName ?? '서울정보통신사무소'}
          >
            {serviceStatus?.stationList?.map((station) => (
              <TreeItem
                key={`${station.stationId + station.stationName}`}
                itemId={`${station.stationId + station.stationName}`}
                label={station.stationName}
              >
                {station?.rruList?.map((rru) => (
                  <TreeItem
                    key={rru.rruId}
                    itemId={rru.rruId}
                    label={rru.rruName}
                    onClick={() => handleChangeBatteryStatus(rru.rruId)}
                  />
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        </SimpleTreeView>
      </Box>
    </Drawer>
  )
}

export default Sidebar
