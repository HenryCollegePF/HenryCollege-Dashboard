
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createNewCurse, getAllCourses } from "../../redux/store/slices/courses/sliceCourse";
import SendIcon from "@mui/icons-material/Send";



export default function Courses() {

  const dispatch = useDispatch();

  
  const {authToken} = useSelector(state=>state.teacherState)
  
  const {list}  = useSelector((state) => state.courseState);
  useEffect(() => {
    dispatch(getAllCourses(authToken));
  }, [dispatch]);
  // *******************************************************************
  return (
    <>
      <Typography ariant="h1" gutterBottom sx={{m:'auto', fontSize:'40px'}}>Lista cursos</Typography>
      <Table size="small" sx={{mt:'3rem'}}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.tags[0]}</TableCell>
              <TableCell>{course.level}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>{course.price}</TableCell>
              <TableCell>{course.teacher ? course.teacher.firstName :'Not asigned'}</TableCell>
              <TableCell>
                <Link to={`/courses/detail/${course.id}`}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size="small"
                    sx={{color:'black'}}
                    >
                    Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Link to={"/courses/add"}>
        <Button 
            variant="contained" 
            endIcon={<SendIcon />}
            size='small'
            sx={{mt:'2rem',ml: '38%',color:'black'}}
            type='submit'
            // onClick={onSubmit}
            >
            New course
          </Button>
          </Link>
      </Table>
      
    </>
  );
}
