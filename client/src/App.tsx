import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { amber } from '@material-ui/core/colors'

import Home from './pages/Home'
import Navbar from './components/Navbar'

const theme = createMuiTheme({
  palette: {
    primary: {
      // amber and green play nicely together.
      main: amber['A700'],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#212121',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md" style={{ marginTop: '3rem' }}>
        <Home />
      </Container>
    </ThemeProvider>
  )
}

export default App
