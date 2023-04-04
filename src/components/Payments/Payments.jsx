import { Checkbox, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../redux/store/slices/payments/slicePayment";


export default function Shopin() {
  const dispatch = useDispatch();

  const {list} = useSelector((state) => state.paymentState);

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  return (
    <>
      <Typography ariant="h1" gutterBottom sx={{ m: "auto", fontSize: "40px" }}>
        Lista pagos
      </Typography>
      <Table size="small" sx={{ mt: "3rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Fecha de compra</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Fecha de expiracion</TableCell>
            <TableCell>Estudiante</TableCell>
            <TableCell>Activo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((pay) => (
            <TableRow key={pay.id}>
              <TableCell>{pay.id}</TableCell>
              <TableCell>{pay.date}</TableCell>
              <TableCell>{pay.pricePaid}</TableCell>
              <TableCell>{pay.expirationDate}</TableCell>
              <TableCell>{pay.Student.firstName}</TableCell>
              <TableCell>{pay.Student.active == true ? (
                  <Checkbox disabled checked />
                ) : (
                  <Checkbox disabled />
                )}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

