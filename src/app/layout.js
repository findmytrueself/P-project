import CssBaseline from '@mui/material/CssBaseline'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import Sidebar from './components/Sidebar'
import { Stack } from '@mui/material'
import Header from './components/Header'
import { BatteryContextProvider } from './context/BatteryContext'

export const metadata = {
  title: 'Battery Monitoring',
  description: 'Battery Monitoring',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <BatteryContextProvider>
              <CssBaseline />
              <Header />
              <Stack sx={{ marginTop: '130px' }} direction="row">
                <Sidebar />
                {children}
              </Stack>
            </BatteryContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
