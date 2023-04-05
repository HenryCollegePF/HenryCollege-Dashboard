import React, { useEffect, useState } from "react";
import {
  createNewCurse,
  getAllCourses,
} from "../../redux/store/slices/courses/sliceCourse";
import { useDispatch, useSelector } from "react-redux";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // **********************************************************************
  const tags = ["Html", "Javascript", "Node", "Css", "Phyton", "React","Java", "Sequilize","Postgres"]
  const {list} = useSelector(state=>state.teacherState)
  // **********************************************************************
  const [inputValues, setInputValues] = useState({
    name: "",
    tags: [],
    level: "",
    duration: 0,
    price: "",
    description: "",
    videoSrc: "",
    imageSrc: "",
    teacherId: ''
  });
  const [inputTags, setInputTags] = useState({
    tags: [],
  });
  // **********************************************************************
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const handleChangeTags = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputTags({
      [name]: [...inputTags.tags, value],
    });
  };
  // *******************************************************************
  const { token } = useSelector((state) => state.teacherState);
  const onSubmit = async (event) => {
    event.preventDefault();
    const {name,price,level,duration,teacherId,description,videoSrc,imageSrc,tags} = inputValues
    setInputValues({
      ...inputValues,
      tags: [...inputTags.tags],
    });
    if(![name,price,level,duration,teacherId,description,videoSrc,imageSrc].every(Boolean) || tags.length === 0){
      alert("Debes completar todos los campos")
    }else{
      dispatch(createNewCurse(inputValues, token));
      navigate("/courses");
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch", mt: "2rem", ml: "15%" },
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
          name="price"
          value={inputValues.price}
          onChange={handleChange}
          defaultValue="Price"
          variant="outlined"
          size="small"
        />
      </div>
      <div>
      <FormControl
          size="small"
          color="secondary"
          sx={{ width: "28%", mt: "2rem", ml: "15%" }}
        >
          <InputLabel id="demo-simple-select-label">Level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Level"
            onChange={handleChange}
            name="level"
            color="secondary"
          >
            {['Basico','Intermedio','Avanzado','Alto'].map(
              (level, index) => {
                return (
                  <MenuItem key={index} value={level}>
                    {level}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
        <TextField
          color="secondary"
          id="outline-basic"
          label="Duration"
          name="duration"
          value={inputValues.duration}
          onChange={handleChange}
          defaultValue="Duration"
          variant="outlined"
          size="small"
        />
      </div>
      <div>
        <FormControl
          size="small"
          color="secondary"
          sx={{ width: "28%", mt: "1.5rem", ml: "15%" }}
        >
          <InputLabel id="demo-simple-select-label">Tags</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tags"
            onChange={handleChangeTags}
            name="tags"
            color="secondary"
          >
            {tags.map(
              (tag, index) => {
                return (
                  <MenuItem key={index} value={tag}>
                    {tag}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          color="secondary"
          sx={{ width: "28%", mt: "1.5rem", ml: "15%" }}
        >
          <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Teacher"
            onChange={handleChange}
            name="teacherId"
            color="secondary"
          >
            {list.map(
              (teacher, index) => {
                return (
                  <MenuItem key={index} value={teacher.id}>
                    {teacher.firstName}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      </div>
      <Box display={"flex"}>
        <Container sx={{width:'50%', ml:'5%'}}>
        <TextField
          color="secondary"
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={inputValues.description}
          onChange={handleChange}
          defaultValue="Description"
          name="description"
        />
        </Container>
        <Container sx={{width:'40%', mt:'2rem'}}>
        {inputTags.tags?.map((tag) => {
          return <Typography sx={{ width: "10%" }}>{tag}</Typography>;
        })}
        <Button size="small" variant="contained" sx={{color:'black'}} onClick={()=>setInputTags({tags: []})}>limpiar</Button>
        </Container>
      </Box>
      <div>
        <TextField
          color="secondary"
          id="outline-basic"
          label="VideoSrc"
          name="videoSrc"
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
          name="imageSrc"
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
        size="small"
        sx={{ mt: "2rem", ml: "38%", color: "black" }}
        type="submit"
        onClick={onSubmit}
      >
        New course
      </Button>
    </Box>
  );
};

export default Add;
