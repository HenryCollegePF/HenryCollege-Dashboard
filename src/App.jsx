import { Box } from '@mui/material'
import './App.css'
import Dashboard from './views/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Login from './views/Login/Login'
import Students from './components/Students/Students'
import Teachers from './components/Teachers/Teachers'
import Courses from './components/Courses/Courses'
import Shopin from './components/Shopin/Shopin'
import EditCourse from "./components/Courses/EditCourse"


function App() {
  const location = useLocation()
  
  return (
    <Box>
      {
        location.pathname === '/' && <Login/>
      }
      <Routes>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/students' element={<Students/>}/>
        <Route exact path='/teachers' element={<Teachers/>}/>
        <Route exact path='/courses' element={<Courses/>}/>
        <Route exact path='/courses/edit/:id' element={<EditCourse/>}/>
        <Route exact path='/shopin' element={<Shopin/>}/>
      </Routes>
    </Box>
  )
}

export default App
