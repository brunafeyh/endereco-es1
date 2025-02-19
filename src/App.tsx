import { RouterProvider } from 'react-router-dom'
import { router } from '../routes'
import { ThemeProvider } from '@emotion/react'
import { theme } from './temas'
import { CssBaseline } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './compartilhado/query-client'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="top-center" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
