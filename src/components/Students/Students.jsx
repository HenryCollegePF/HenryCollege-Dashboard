import React, { useEffect ,useState} from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { allStudents,deleteStudent } from "../../redux/store/slices/students/sliceStudent";
import { useSelector, useDispatch } from "react-redux";
import { Button, Checkbox } from "@mui/material";
import { Typography } from "@mui/material";


export default function Students() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.teacherState);

  const { list } = useSelector((state) => state.studentState);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(()=>{
    dispatch(allStudents(token))
    setShouldReload(false);
  },[dispatch, token,shouldReload])

  
  return (
    <>
      <Typography ariant="h1" gutterBottom sx={{ m: "auto", fontSize: "40px" }}>
        Lista estudiantes
      </Typography>
      <Table size="small" sx={{ mt: "3rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell></TableCell>
            <TableCell>Activo</TableCell>
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
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ color: "black" }}
                  onClick={()=>{
                    dispatch(deleteStudent(user.id, token))
                    setShouldReload(true);
                  }
                }
                >
                  {user.active?"Desactivar":"Activar"}
                </Button>
              </TableCell>
              <TableCell>
                {user.active ? (
                  <Checkbox disabled checked />
                ) : (
                  <Checkbox disabled />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
