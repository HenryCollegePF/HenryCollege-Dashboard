import { Visibility, VisibilityOff } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
	postNewTeacher
} from "../../redux/store/slices/teachers/sliceTeacher";
import { validateEmail, validateFirstName, validateLastName, validatePass, validatePassTwo, validatePhone } from "./validations";


const FormTeacher = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
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
	  // *********************************  ERRORS VALIDATE  ****************************
	  const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		passwordTwo: ''
	  });
	  const validate = () =>{
		setErrors({
		  ...errors,
		  firstName : validateFirstName(inputs.firstName),
		  lastName : validateLastName(inputs.lastName),
		  email : validateEmail(inputs.email),
		  phone : validatePhone(inputs.phone),
		  password : validatePass(inputs.password),
		  passwordTwo : validatePassTwo(confirmPas.password)
		}) 
	  }
	  useEffect(()=>{
		validate()
	  },[inputs,confirmPas])
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
	  // ***************************  SUBMIT  ********************************
	  const onSubmit = async (event) => {
		event.preventDefault()
		const {firstName,lastName,email,phone,password,passwordTwo} = errors
		if([firstName,lastName,email,phone,password,passwordTwo].every(Boolean))
		return  alert("Debes llenar todos los campos")
		
		inputs.password !== confirmPas.password ? 
		alert("La contraseña debe ser igual"):
		dispatch(postNewTeacher(inputs));
		navigate("/teachers")
	  };
	  
	  // **********************************************************************
	  return (
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
              error= {errors.firstName}
              color="secondary"
              id="outlined-basic"
              label="First Name"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
              defaultValue="First Name"
              variant="outlined"
              size="small"
              helperText={errors.firstName}
            />
            <TextField
              error= {errors.lastName}
              color="secondary"
              id="outlined-basic"
              label="Last Name"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
              defaultValue="Last Name"
              variant="outlined"
              size="small"
              helperText={errors.lastName}
            />
          </div>
          <div>
            <TextField
            error= {errors.email}
              color="secondary"
              id="outlined-basic"
              label="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              defaultValue="Email"
              variant="outlined"
              size="small"
              helperText={errors.email}
            />
            <TextField
            error={errors.phone}
              color="secondary"
              id="outline-basic"
              label="Phone"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              defaultValue="Phone"
              variant="outlined"
              size="small"
              helperText={errors.phone}
            />
          </div>
          <div>
            <FormControl sx={{ml:7, mt:3, width:225}} color="secondary" error={errors.password}>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
              sx={{mt:'0.3rem'}}
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
              <FormHelperText id="filled-weight-helper-text">{errors.password}</FormHelperText>
            </FormControl>

            <FormControl sx={{ ml: 7, mt:3, width: 220 }} color="secondary" error={errors.passwordTwo}>
              <InputLabel htmlFor="outlined-adornment-password">
                Repite la contraseña
              </InputLabel>
              <OutlinedInput
               sx={{mt:'0.3rem'}}
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
              <FormHelperText id="filled-weight-helper-text">{errors.passwordTwo}</FormHelperText>
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
            Add Teacher
          </Button>
        </Box>
	  )
};

export default FormTeacher;
