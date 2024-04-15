'use client'

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Box,
  Divider,
} from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import Image from 'next/image'
import { useBatteryContext } from '../../context/BatteryContext'
import { clientAxiosInstance } from '../../api/axios'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const {
    serviceStatus,
    setOffice,
    station,
    setStation,
    rru,
    setBatteryStatus,
    setRru,
    setRruInfo,
  } = useBatteryContext()
  const [open, setState] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    //changes the function state according to the value of open
    setState(open)
  }

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
        setState(false)
      }
    } catch (e) {
      console.error(e, 'error')
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        background: '#fff',
        color: '#000',
        boxShadow: 'none',
        p: isMobile ? 0 : '12px',
      }}
    >
      <Toolbar sx={isMobile && { justifyContent: 'space-between' }}>
        <Image
          src="/arloo.png"
          width={80}
          height={80}
          style={isMobile ? { marginRight: '12px' } : { marginRight: '24px' }}
        />
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          noWrap
          sx={isMobile ? { fontWeight: 600 } : { fontWeight: 600 }}
        >
          배터리 모니터링
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          sx={{
            ml: 1,
            display: {
              xs: 'block',
              sm: 'none',
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          //from which side the drawer slides in
          anchor="right"
          //if open is true --> drawer is shown
          open={open}
          //function that is called when the drawer should close
          onClose={toggleDrawer(false)}
          //function that is called when the drawer should open
          onOpen={toggleDrawer(true)}
        >
          {/* The inside of the drawer */}
          <Box
            sx={{
              p: 1,
              height: 1,
            }}
          >
            {/* when clicking the icon it calls the function toggleDrawer and closes the drawer by setting the variable open to false */}
            <IconButton sx={{ mb: 2 }}>
              <CloseIcon onClick={toggleDrawer(false)} />
            </IconButton>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ margin: 1 }}>
              <SimpleTreeView
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
                          onClick={() =>
                            handleChangeBatteryStatus(rru.rruId, false)
                          }
                        />
                      ))}
                    </TreeItem>
                  ))}
                </TreeItem>
              </SimpleTreeView>
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}

export default Header
