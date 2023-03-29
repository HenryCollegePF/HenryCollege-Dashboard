import React,{useEffect,useState} from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button} from "@mui/material";
import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {TextField} from "@mui/material";
import Title from "../Title/Title";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeachers } from "../../redux/store/slices/teachers/sliceTeacher";
import { Avatar } from "@mui/material";
import { postNewTeacher } from "../../redux/store/slices/teachers/sliceTeacher";
import {Typography} from "@mui/material";


export default function Students() {
  const dispatch = useDispatch()

// **********************************************************************
const [showForm, setShowForm] = useState(false);
function preventDefault(event) {
  event.preventDefault();
  setShowForm(!showForm);
}
// **********************************************************************  
const [inputs, setInputs] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
});
// **********************************************************************
const handleChange = (event) =>{
  event.preventDefault()
  const {name ,value} = event.target
  setInputs({
    ...inputs,
    [name] : value
  })
}
const onSubmit = async(event) => {
  event.preventDefault()
  dispatch(postNewTeacher(inputs))
}
const {authToken} = useSelector(state=>state.teacherState)

useEffect(()=>{
  dispatch(getAllTeachers(authToken))
},[dispatch,showForm])

const results = useSelector(state=>state.teacherState.list)
  return (
    <React.Fragment>
      <Typography ariant="h1" gutterBottom sx={{m:'auto', fontSize:'40px'}}>Lista de profesores</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell align="right">Imagen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.id}</TableCell>
              <TableCell>{teacher.firstName}</TableCell>
              <TableCell>{teacher.lastName}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.phone}</TableCell>
              <TableCell><Avatar alt="Remy Sharp" src="https://i.ytimg.com/vi/O5zJ2nDPgeU/maxresdefault.jpg" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* *********************Form add new teacher********************************* */}
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
              label="First Name"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
              defaultValue="First Name"
              variant="standard"
              size="small"
            />
          <TextField
              error
              id="standard-size-normal"
              label="Last Name"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
              defaultValue="Last Name"
              variant="standard"
              size="small"
            />
          </div>
          <div>
          <TextField
              error
              id="standard-size-normal"
              label="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              defaultValue="Email"
              variant="standard"
              size="small"
            />
          <TextField
              error
              id="standard-size-normal"
              type='password'
              label="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              defaultValue="Password"
              variant="standard"
              size="small"
            />
          </div>
          <div>
          <TextField
              error
              id="standard-size-normal"
              label="Phone"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              defaultValue="Phone"
              variant="standard"
              size="small"
            />
            <Button
              variant="contained" 
              endIcon={<SendIcon />}
              size='small'
              sx={{mt:'1rem'}}
              type='submit'
              onClick={onSubmit}
              >
              New teacher
            </Button>

          </div>
        </Box>
      )}
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 5 }}>
        Add teachers
      </Link>
      
    </React.Fragment>
  );
}

