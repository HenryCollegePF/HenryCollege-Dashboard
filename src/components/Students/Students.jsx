import React,{useEffect} from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title/Title";
import { getAllUsers } from "../../redux/store/slices/users/sliceUsers";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "@mui/material";
import {Typography} from "@mui/material";

function preventDefault(event) {
  event.preventDefault();
}

export default function Students() {
  const dispatch = useDispatch()

  const {authToken} = useSelector(state=>state.teacherState)


  useEffect(() => {
    dispatch(getAllUsers(authToken));
  }, [dispatch]);

const  {list} = useSelector(state=>state.userState)


  return (
    <React.Fragment>
      <Typography ariant="h1" gutterBottom sx={{m:'auto', fontSize:'40px'}}>Lista de Estudiantes</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell align="right">Activo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell align="right"><Checkbox defaultChecked /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver todos los estudiantes
      </Link>
    </React.Fragment>
  );
}
