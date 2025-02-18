import { RouterProvider } from 'react-router-dom'
import { router } from '../routes'
import { ThemeProvider } from '@emotion/react'
import { theme } from './temas'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
