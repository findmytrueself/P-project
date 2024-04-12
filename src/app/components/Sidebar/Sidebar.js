'use client'

import React, { useEffect, useState } from 'react'
import { Box, Drawer } from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { useBatteryContext } from '../../context/BatteryContext'
import { clientAxiosInstance } from '../../api/axios'

const drawerWidth = 240

const Sidebar = () => {
  const { serviceStatus, setBatteryStatus } = useBatteryContext()
  const [selected, setSelected] = useState([])

  const handleChangeBatteryStatus = async (rruId, isFirst) => {
    try {
      const getBatteryStatus = await clientAxiosInstance.get(`/rrus/${rruId}`)
      setBatteryStatus(getBatteryStatus.data)
      if (!isFirst) {
        setSelected(rruId)
      }
    } catch (e) {
      console.error(e, 'error')
    }
  }

  useEffect(() => {
    // 컴포넌트가 마운트될 때 serviceStatus가 존재하는 경우, 첫 번째 rru의 배터리 상태를 가져옴
    if (serviceStatus) {
      const firstRruId = serviceStatus?.stationList?.[0]?.rruList?.[0]?.rruId
      if (firstRruId) {
        handleChangeBatteryStatus(firstRruId, true)
        setSelected(firstRruId)
      }
    }
  }, [serviceStatus]) // serviceStatus가 변경될 때마다 useEffect 실행

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
        <SimpleTreeView
          sx={{ marginTop: '120px' }}
          multiSelect
          defaultExpandedItems={['서울정보통신사무소', '청량리']}
          selectedItems={selected}
        >
          <TreeItem
            key={serviceStatus.officeName}
            itemId={serviceStatus.officeName ?? '서울정보통신사무소'}
            label={serviceStatus.officeName ?? '서울정보통신사무소'}
          >
            {serviceStatus?.stationList?.map((station) => (
              <TreeItem
                key={`${station.stationName}`}
                itemId={`${station.stationName}`}
                label={station.stationName}
              >
                {station?.rruList?.map((rru) => (
                  <TreeItem
                    key={rru.rruId}
                    itemId={rru.rruId}
                    label={rru.rruName}
                    onClick={() => handleChangeBatteryStatus(rru.rruId, false)}
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
