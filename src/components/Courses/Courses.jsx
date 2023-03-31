import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import SendIcon from "@mui/icons-material/Send";
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


export default function Courses() {

  const dispatch = useDispatch();

  // **********************************************************************
  const [showForm, setShowForm] = useState(false);
  const handlerShowForm = (event) => {
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
  const {list}  = useSelector((state) => state.courseState);
  useEffect(() => {
    dispatch(getAllCourses(authToken));
  }, [dispatch, showForm]);
  // *******************************************************************
  return (
    <React.Fragment>
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
      </Table>
      {showForm && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch",mt:'2rem',ml:'8%'},
          }}
          noValidate
          autoComplete="off"
        >
          <div>
          <TextField
           color="secondary"
              id="outlined-basic"
              label="Name"
              name="name"
              value={inputValues.name}
              onChange={handleChange}
              defaultValue="Name"
              variant="outlined"
              size="small"
            />
            <TextField
             color="secondary"
              id="outlined-basic"
              label="Price"
              name='price'
              value={inputValues.price}
              onChange={handleChange}
              defaultValue="Price"
              variant="outlined"
              size="small"
            />
            
          </div>
          <div>
          <TextField
          color="secondary"
              id="outlined-basic"
              label="Level"
              name='level'
              value={inputValues.level}
              onChange={handleChange}
              defaultValue="Level"
              variant="outlined"
              size="small"
            />
            <TextField
             color="secondary"
              id="outline-basic"
              label="Duration"
              name='duration'
              value={inputValues.duration}
              onChange={handleChange}
              defaultValue="Duration"
              variant="outlined"
              size="small"
            />
          </div>
          <div>
          <FormControl  color="secondary" sx={{ width: '76%', mt:'1.5rem', ml:'8%' }}>
              <InputLabel id="demo-simple-select-label">Tags</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tags"
                onChange={handleChangeTags}
                name='tags'
                color="secondary"
              >
                {
                  ['Html','Javascript','Node','Css','Phyton'].map((tag,index)=>{
                    return <MenuItem  key={index} value={tag}>{tag}</MenuItem>

                  })
                }
              </Select>
          </FormControl>
          </div>
          <div>
              <TextField
                 color="secondary"
                id="outlined-multiline-static"
                label="Description"
                multiline
                sx={{ width: '70px' }}
                rows={4}
                value={inputValues.description}
                onChange={handleChange}
                defaultValue="Description"
                name='description'
              />
          </div>
          <div>
            <TextField
             color="secondary"
              id="outline-basic"
              label="VideoSrc"
              name='videoSrc'
              value={inputValues.videoSrc}
              onChange={handleChange}
              defaultValue="VideoSrc"
              variant="outlined"
              size="small"
            />
            <TextField
             color="secondary"
              id="outline-basic"
              label="ImageSrc"
              name='imageSrc'
              value={inputValues.imageSrc}
              onChange={handleChange}
              defaultValue="ImageSrc"
              variant="outlined"
              size="small"
            />
          </div>
          <Button 
            variant="contained" 
            endIcon={<SendIcon />}
            size='small'
            sx={{mt:'2rem',ml: '38%',color:'black'}}
            type='submit'
            onClick={onSubmit}
            >
            New course
          </Button>
        </Box>
      )}
        {
          showForm ? 
          <Button onClick={handlerShowForm} color="secondary" sx={{ m:'auto',mt:'2rem' }} variant="outlined"><PublishRoundedIcon/></Button> 
          :
          <Button onClick={handlerShowForm} color="secondary" sx={{ m:'auto',mt:'2rem' }} variant="outlined">Add Course</Button>
        }
    </React.Fragment>
  );
}
