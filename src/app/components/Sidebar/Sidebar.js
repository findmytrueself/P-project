'use client'
import React, { useEffect } from 'react'
import { Box, Drawer } from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { useBatteryContext } from '../../context/BatteryContext'
import { clientAxiosInstance } from '../../api/axios'

const Sidebar = () => {
  const {
    serviceStatus,
    setBatteryStatus,
    setOffice,
    station,
    setStation,
    rru,
    setRru,
    setRruInfo,
  } = useBatteryContext()

  const handleChangeBatteryStatus = async (rruId, isFirst) => {
    try {
      const getBatteryStatus = await clientAxiosInstance.get(`/rrus/${rruId}`)
      setBatteryStatus(getBatteryStatus.data)
      if (!isFirst) {
        const rruInfo = serviceStatus?.stationList?.flatMap((stationEl) => {
          if (stationEl.stationName === station) {
            return stationEl.rruList.find((rruEl) => {
              if (rruEl.rruId === rruId) {
                return true
              }
              return false
            })
          }
          return []
        })
        setRru(rruId)
        setRruInfo(rruInfo[0])
      }
    } catch (e) {
      console.error(e, 'error')
    }
  }

  useEffect(() => {
    if (serviceStatus) {
      const firstRruId = serviceStatus?.stationList?.[0]?.rruList?.[0]?.rruId
      if (firstRruId) {
        handleChangeBatteryStatus(firstRruId, true)
        setOffice(serviceStatus.officeName)
        setStation(serviceStatus?.stationList?.[0].stationName)
        setRru(firstRruId)
        setRruInfo(serviceStatus?.stationList?.[0]?.rruList?.[0])
      }
    }
  }, [serviceStatus])

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
          selectedItems={rru}
        >
          <TreeItem
            key={serviceStatus.officeName}
            itemId={serviceStatus.officeName ?? '서울정보통신사무소'}
            label={serviceStatus.officeName ?? '서울정보통신사무소'}
            onClick={() => setOffice(serviceStatus.officeName)}
          >
            {serviceStatus?.stationList?.map((station) => (
              <TreeItem
                key={`${station.stationName}`}
                itemId={`${station.stationName}`}
                label={station.stationName}
                onClick={() => setStation(station.stationName)}
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

const drawerWidth = 240
