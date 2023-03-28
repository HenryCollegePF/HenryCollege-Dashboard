import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title/Title";
import { getAllCourses } from "../../redux/store/slices/courses/sliceCourse";
import { useSelector, useDispatch } from "react-redux";
import { Box, TextField, Button, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import List from "@mui/material/List";
import axios from "axios";
import { setAuthToken } from "../../utils/auth";
import { createNewCurse } from "../../redux/store/slices/courses/sliceCourse";
import { Link } from "react-router-dom";

export default function Courses() {

  const dispatch = useDispatch();

  // **********************************************************************
  const [showForm, setShowForm] = useState(false);
  function preventDefault(event) {
    event.preventDefault();
    setShowForm(!showForm);
  }
  // **********************************************************************
  const [inputValues, setInputValues] = useState({
    name: '',
    tags: [],
    level: '',
    duration: 0,
    price: '',
    description:'',
    videoSrc: '',
    imageSrc: ''
  });
  const [inputTags, setInputTags] = useState({
    tags : []
  })
  // **********************************************************************
  const handleChange = (event) =>{
    event.preventDefault()
    const {name ,value} = event.target
    setInputValues({
      ...inputValues,
      [name] : value
    })
  }
  const handleChangeTags = (event)=>{
    event.preventDefault()
    const {name,value} = event.target
    setInputTags({
      [name] : [...inputTags.tags,value]
    })
  }
  // *******************************************************************
  const {authToken} = useSelector(state=>state.teacherState)
  const onSubmit = async(event) => {
    event.preventDefault()
    setInputValues({
      ...inputValues,
      tags : [...inputTags.tags]
    })
    dispatch(createNewCurse(inputValues,authToken))
  }
  useEffect(() => {
    dispatch(getAllCourses(authToken));
  }, [dispatch, showForm]);
  const {results}  = useSelector((state) => state.courseState.list);
  // *******************************************************************
  return (
    <React.Fragment>
      <Title>Lista de cursos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.tags[0]}</TableCell>
              <TableCell>{course.level}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>{course.price}</TableCell>
              <TableCell>{course.teacher ? course.teacher.firstName :'Not asigned'}</TableCell>
              <TableCell>
                <Button 
                  variant="outlined" 
                  color="error"
                  size="small"
                  >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Link to={`/courses/edit/${course.id}`}>
                <Button 
                  variant="outlined" 
                  color="error"
                  size="small"
                  >
                  Edit
                </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showForm && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
          <TextField
              error
              id="standard-size-normal"
              label="Name"
              name="name"
              value={inputValues.name}
              onChange={handleChange}
              defaultValue="Name"
              variant="standard"
              size="small"
            />
            <FormControl sx={{ width: '28%' }}>
              <InputLabel id="demo-simple-select-label">Tags</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tags"
                onChange={handleChangeTags}
                name='tags'
              >
                {
                  ['Html','Javascript','Node','Css','Phyton'].map((tag,index)=>{
                    return <MenuItem key={index} value={tag}>{tag}</MenuItem>

                  })
                }
              </Select>
          </FormControl>
          </div>
          <div>
          <TextField
              error
              id="standard-error"
              label="Level"
              name='level'
              value={inputValues.level}
              onChange={handleChange}
              defaultValue="Level"
              variant="standard"
              size="small"
            />
            <TextField
              error
              id="standard-error"
              label="Duration"
              name='duration'
              value={inputValues.duration}
              onChange={handleChange}
              defaultValue="Duration"
              variant="standard"
              size="small"
            />
          </div>
          <div>
            <TextField
              error
              id="standard-error"
              label="Price"
              name='price'
              value={inputValues.price}
              onChange={handleChange}
              defaultValue="Price"
              variant="standard"
              size="small"
            />
            <TextField
              error
              id="standard-error"
              label="Description"
              name='description'
              value={inputValues.description}
              onChange={handleChange}
              defaultValue="Description"
              variant="standard"
              size="small"
            />
          </div>
          <div>
            <TextField
              error
              id="standard-error"
              label="VideoSrc"
              name='videoSrc'
              value={inputValues.videoSrc}
              onChange={handleChange}
              defaultValue="VideoSrc"
              variant="standard"
              size="small"
            />
            <TextField
              error
              id="standard-error"
              label="ImageSrc"
              name='imageSrc'
              value={inputValues.imageSrc}
              onChange={handleChange}
              defaultValue="ImageSrc"
              variant="standard"
              size="small"
            />
          </div>
          <Button 
            variant="contained" 
            endIcon={<SendIcon />}
            size='small'
            sx={{mt:'1rem'}}
            type='submit'
            onClick={onSubmit}
            >
            Crear curso
          </Button>
        </Box>
      )}
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Agregar otro curso
      </Link>
    </React.Fragment>
  );
}
