import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginTeacher } from "../../redux/store/slices/teachers/sliceTeacher";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginTeacher(inputs));
    navigate("/dashboard");
  };
  
  // *******Esto es de MUI para hacer visible la contraseña ***************
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // **************************************************************************
  return (
    <Box>
      <TextField
        label="User"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        name="email"
        value={inputs.email}
        onChange={onChange}
        color='secondary'
      />

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" color="secondary">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={inputs.password}
          onChange={onChange}
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

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          onClick={onSubmit}
          color='primary'
        >
          Go !
        </Button>
      </Stack>
    </Box>
  );
}
