import CssBaseline from '@mui/material/CssBaseline'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import Sidebar from './components/Sidebar'
import { Stack } from '@mui/material'
import Header from './components/Header'

export const metadata = {
  title: 'Park Project',
  description: 'Park Project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Stack sx={{ marginTop: '130px' }} direction="row" spacing={4}>
              <Sidebar />
              {children}
            </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
