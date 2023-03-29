import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Dashboard from './views/Dashboard/Dashboard'
import Login from './views/Login/Login'


function App() {
  const location = useLocation()
  
  return (
    <Box>
      {
        location.pathname === '/' ? <Login/> : <Dashboard/>
      }
    </Box>
  )
}

export default App
