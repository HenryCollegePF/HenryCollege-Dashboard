import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeachers } from "../../redux/store/slices/teachers/sliceTeacher";
import { Avatar } from "@mui/material";
import {
  postNewTeacher,
  deleteTeacher,
} from "../../redux/store/slices/teachers/sliceTeacher";
import { Typography } from "@mui/material";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { VisibilityOff } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";

export default function Students() {
  const dispatch = useDispatch();

  // **********************************************************************
  const [showForm, setShowForm] = useState(false);
  const handlerShowForm = (event) => {
    event.preventDefault();
    setShowForm(!showForm);
  };
  // **********************************************************************
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPas, setconfirmPas] = useState({
    password: "",
  });
  // **********************************************************************
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const changePass = (event) => {
    event.preventDefault();
    const {name,value} = event.target
    setconfirmPas({ 
      ...confirmPas,
      [name]: value, });
  };
  // **********************************************************************
  const onSubmit = async (event) => {
    event.preventDefault();
    inputs.password !== confirmPas.password ? 
    alert("La contraseña debe ser igual"):
    dispatch(postNewTeacher(inputs));
  };
  const { authToken } = useSelector((state) => state.teacherState);

  const results = useSelector((state) => state.teacherState.list);

  // *******Esto es de MUI para hacer visible la contraseña ***************
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }; // ********************************************************************
  const [showPasswordTwo, setShowPasswordTwo] = React.useState(false);
  const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);
  const handleMouseDownPasswordTwo = (event) => {
    event.preventDefault();
  }; // ********************************************************************
  useEffect(() => {
    dispatch(getAllTeachers(authToken));
  }, [dispatch, showForm]);

  return (
    <React.Fragment>
      <Typography ariant="h1" gutterBottom sx={{ m: "auto", fontSize: "40px" }}>
        Lista profesores
      </Typography>
      <Table size="small" sx={{ mt: "3rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell></TableCell>
            <TableCell>Acitivo</TableCell>
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
              <TableCell>
                <Avatar
                  alt="Remy Sharp"
                  src="https://i.ytimg.com/vi/O5zJ2nDPgeU/maxresdefault.jpg"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ color: "black" }}
                  onClick={() => dispatch(deleteTeacher(teacher.id, authToken))}
                >
                  Eliminar
                </Button>
              </TableCell>
              <TableCell>
                {teacher.active == true ? (
                  <Checkbox disabled checked />
                ) : (
                  <Checkbox disabled />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* *********************Form add new teacher********************************* */}
      {showForm && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "25ch",
              mt: "2rem",
              ml: "8%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              color="secondary"
              id="outlined-basic"
              label="First Name"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
              defaultValue="First Name"
              variant="outlined"
              size="small"
            />
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Last Name"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
              defaultValue="Last Name"
              variant="outlined"
              size="small"
            />
          </div>
          <div>
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              defaultValue="Email"
              variant="outlined"
              size="small"
            />
            <TextField
              color="secondary"
              id="outline-basic"
              label="Phone"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              defaultValue="Phone"
              variant="outlined"
              size="small"
            />
          </div>
          <div>
            <FormControl sx={{ml:8, mt:3, width:225}} color="secondary">
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputs.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>

            <FormControl sx={{ ml: 9, mt:3, width: 220 }} color="secondary">
              <InputLabel htmlFor="outlined-adornment-password">
                Repite la contraseña
              </InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password"
                type={showPasswordTwo ? "text" : "password"}
                name="password"
                value={confirmPas.password}
                onChange={changePass}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordTwo}
                      onMouseDown={handleMouseDownPasswordTwo}
                      edge="end"
                    >
                      {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Repite la contraseña"
              />
            </FormControl>
          </div>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            size="small"
            sx={{ mt: "2rem", ml: "38%", color: "black" }}
            type="submit"
            onClick={onSubmit}
          >
            Add teacher
          </Button>
        </Box>
      )}
      {showForm ? (
        <Button
          onClick={handlerShowForm}
          color="secondary"
          sx={{ m: "auto", mt: "2rem" }}
          variant="outlined"
        >
          <PublishRoundedIcon />
        </Button>
      ) : (
        <Button
          onClick={handlerShowForm}
          color="secondary"
          sx={{ m: "auto", mt: "2rem" }}
          variant="outlined"
        >
          Add Teacher
        </Button>
      )}
    </React.Fragment>
  );
}
