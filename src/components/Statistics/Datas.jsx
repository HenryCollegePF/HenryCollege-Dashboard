import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { useSelector } from 'react-redux';



const Datas = () => {
    const student = useSelector(state=>state.studentState.list)
    const course = useSelector(state=>state.courseState.list)
    const teacher = useSelector(state=>state.teacherState.list)

    const stilesBox = {
        bgcolor: '#e0e0e0',
        height: '20vh', 
        width:'20vh', 
        ml:'6%',
        mt:'2rem',
        display:'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        padding:'1rem',
        borderRadius:'6px'
    }
    const stilesIcon = {boxShadow:'1px 1px 1px 1px grey',borderRadius:'10px', fontSize:'30px',bgcolor: '#ffff00',}
    const stilesCount = {mt:'1rem', fontSize: '30px'}
  return (

    <>
        <Container maxWidth="sm" sx={{display:'flex', justifyContent:'center'}}>
            <Box sx={stilesBox}>
                <PeopleIcon sx={stilesIcon}/>
                <Typography sx={stilesCount}>{teacher.length}</Typography>
                <Typography>Teachers</Typography>
            </Box>
            <Box sx={stilesBox}>
                <AccountBalanceIcon sx={stilesIcon}/>
                <Typography sx={stilesCount}>{course.length}</Typography>
                <Typography>Courses</Typography>
            </Box>
            <Box sx={stilesBox}>
                <LocalLibraryIcon sx={stilesIcon}/>
                <Typography sx={stilesCount}>{student.length}</Typography>
                <Typography>Students</Typography>
            </Box>
        </Container>
    </>
  )
}

export default Datas