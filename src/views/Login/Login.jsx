import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachers, loginTeacher } from "../../redux/store/slices/teachers/sliceTeacher";
import { useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const teachers = useSelector(state=>state.teacherState.list)

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const login = () =>{
    dispatch(loginTeacher(inputs));
  }
  const {token} = useSelector(state=>state.teacherState)

  const onSubmit = () => {
    token ? navigate("/dashboard") :
    alert("El usuario no esta registrado")
  };

  const handlerClick = () =>{
    try {
      login()
    } catch (error) {
      alert("El usuario no esta registrado")
    }
    onSubmit()
  }

  const validate = (pass) => {
    let valid = /^[^@]+@henrycollege\.[^@]+$/
    if (valid.test(pass)) {
      return true
    } else {
      return false
    }
  }

  // *******Esto es de MUI para hacer visible la contraseña ***************
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // **************************************************************************
  return (
    <Box display={"flex"}>
      <Box sx={{ width: 682, bgcolor: "#ffff00", height: "100vh" }}>
        <Box sx={{ mt: 30, ml: 26 }}>
          <img
            src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png"
            alt="imagen izquierda"
            width="60%"
          />
          <Typography sx={{ fontSize: "26px", color: "black" }}>
            College Administration
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: 100, height: 20, mt: 20, ml: 20 }}>
        <Box sx={{ ml: "6%" }}>
          <img
            src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/HENRY/original.PNG?1627058942"
            alt="henry"
            width="50%"
          />
          <Typography sx={{ fontSize: "20px", color: "black" }}>
            Dashboard
          </Typography>
        </Box>
        <TextField
          label="User"
          id="outlined-basic"
          sx={{
            m: 1,
            width: "40ch",
            bgcolor: "#e8eaf6",
            borderRadius: "8px",
            mt: "1rem",
          }}
          name="email"
          value={inputs.email}
          onChange={onChange}
          color="secondary"
          size="small"
        />

        <FormControl
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
          color="secondary"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="password"
            size="small"
            value={inputs.password}
            onChange={onChange}
            sx={{ bgcolor: "#e8eaf6", borderRadius: "8px", mt: "0.4rem" }}
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
            label="Password"
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          onClick={handlerClick}
          color="secondary"
          sx={{
            width: "44ch",
            height: "50px",
            bgcolor: "#eeeeee",
            mt: "3rem",
            ml: "7%",
          }}
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
}
