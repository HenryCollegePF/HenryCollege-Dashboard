import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button,Checkbox, } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeachers,deleteTeacher } from "../../redux/store/slices/teachers/sliceTeacher";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Teachers=()=> {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.teacherState);
  const { list } = useSelector((state) => state.teacherState);

    
  useEffect(() => {
    if (!list || list.length === 0) {
      dispatch(getAllTeachers(authToken));
    }
  }, [ dispatch, authToken, list]);


  return (
    <>
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
          {list?.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.id}</TableCell>
              <TableCell>{teacher.firstName}</TableCell>
              <TableCell>{teacher.lastName}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.phone}</TableCell>
              <TableCell>
                 <Avatar src="/broken-image.jpg" />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ color: "black" }}
                  onClick={()=>dispatch(deleteTeacher(teacher.id,authToken))}
                >
                  Activar
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
      <Link to={"/teacher/form"}>
        <Button
            color="primary"
            sx={{ m: "auto", mt: "2rem" ,ml:40, color:'black'}}
            variant="contained"
            size="small"
          >
            Add Teacher
          </Button>
      </Link>
        
    </>
  );
}

export default Teachers
