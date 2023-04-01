import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import * as React from "react";
import { Link } from "react-router-dom";


export const mainListItems = (
  <React.Fragment>

    <Link to={"/statistics"}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText secondary="Dashboard" />
      </ListItemButton>    
    </Link>

    <Link to={"/payments"}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText secondary="Payments" />
      </ListItemButton>
    </Link>

    <Link to={"/students"}>
      <ListItemButton>
        <ListItemIcon>
          <LocalLibraryIcon />
        </ListItemIcon>
        <ListItemText secondary="Students" />
      </ListItemButton>
    </Link>
    
    <Link to={"/courses"}>
      <ListItemButton>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText secondary="Courses" />
      </ListItemButton>
    </Link>

    <Link to={"/teachers"}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText secondary="Teachers" />
      </ListItemButton>
    </Link>


  </React.Fragment>
);


