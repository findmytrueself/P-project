import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'
import { useBatteryContext } from '../../context/BatteryContext'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Chip } from '@mui/material'

export default function BatteryInsideModal({ open, setOpen }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const { rruInfo } = useBatteryContext()
  const handleClose = () => setOpen(false)

  // useEffect(() => {
  //   const getCameraStatus = async () => {
  //     const cameraStatus = await axios.get('http://220.117.38.2:8099/devstatus')
  //     console.log(cameraStatus, 'cameraStatus')
  //   }
  //   getCameraStatus()
  // }, [])

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent sx={isMobile ? { width: 350 } : { width: 600 }}>
        <h2 id="unstyled-modal-title" className="modal-title">
          {`함체 내부보기`}
          <Chip
            label={
              typeof rruInfo.cameraStatus === Boolean && rruInfo.cameraStatus
                ? '연결됨'
                : '연결끊김'
            }
            color={
              typeof rruInfo.cameraStatus === Boolean && rruInfo.cameraStatus
                ? 'success'
                : 'error'
            }
          />
        </h2>

        {/* <p id="unstyled-modal-description" className="modal-description">
          {`ledControl: ${rruInfo.ledControl}`}
        </p> */}
        <p id="unstyled-modal-description" className="modal-description">
          ch1
        </p>
        <IframeWrapper>
          <Iframe src="http://220.117.38.2:8083/stream/player/ch1" />
        </IframeWrapper>
        <p id="unstyled-modal-description" className="modal-description">
          ch2
        </p>
        <IframeWrapper>
          <Iframe src="http://220.117.38.2:8083/stream/player/ch2" />
        </IframeWrapper>
        <p id="unstyled-modal-description" className="modal-description">
          ch3
        </p>
        <IframeWrapper>
          <Iframe src="http://220.117.38.2:8083/stream/player/ch3" />
        </IframeWrapper>
        <p id="unstyled-modal-description" className="modal-description">
          ch4
        </p>
        <IframeWrapper>
          <Iframe src="http://220.117.38.2:8083/stream/player/ch4" />
        </IframeWrapper>
        <p id="unstyled-modal-description" className="modal-description">
          ch5
        </p>
        <IframeWrapper>
          <Iframe src="http://220.117.38.2:8083/stream/player/ch5" />
        </IframeWrapper>
      </ModalContent>
    </Modal>
  )
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  )
})

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
}

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
}

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    height: 80vh;
    overflow: scroll;

    & .modal-title {
      display: flex;
      justify-content: space-between;
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
)

const IframeWrapper = styled('div')`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 -> 9/16x100 */
  overflow: hidden;
`

const Iframe = styled('iframe')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
`

// const TriggerButton = styled('button')(
//   ({ theme }) => css`
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-weight: 600;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     padding: 8px 16px;
//     border-radius: 8px;
//     transition: all 150ms ease;
//     cursor: pointer;
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
//     box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

//     &:hover {
//       background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//     }

//     &:active {
//       background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
//     }

//     &:focus-visible {
//       box-shadow: 0 0 0 4px
//         ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//       outline: none;
//     }
//   `
// )
