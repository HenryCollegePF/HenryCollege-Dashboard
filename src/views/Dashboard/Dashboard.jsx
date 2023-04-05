import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import logoHenry from "../../assets/logoHenry.png";
import Courses from "../../components/Courses/Courses";
import Details from "../../components/Courses/Details";
import Payments from "../../components/Payments/Payments";
import Students from "../../components/Students/Students";
import Teachers from "../../components/Teachers/Teachers";
import { mainListItems } from "./ListItems";
import PieGraphic from "../../components/Statistics/PieGraphic";
import Datas from "../../components/Statistics/Datas";
import FormTeacher from "../../components/FormTeacher/FormTeacher";
import { useDispatch } from "react-redux";
import { logoutTeacher } from "../../redux/store/slices/teachers/sliceTeacher";
import Add from "../../components/Courses/Add";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = (event) => {
    event.preventDefault();
    dispatch(logoutTeacher())
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar
          sx={{
            pr: "40px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ marginLeft: "26px" }}
          >
            <img src={logoHenry} width="35px" />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="black"
            noWrap
            sx={{ flexGrow: 1, ml:'2%' }}
          >
            |  Henry college Dashboard
           
          </Typography>
          <IconButton color="secondary" onClick={logout}>
            {/* <Badge badgeContent={4} color="secondary">
            </Badge> */}
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer sx={{ ml: "6rem" }} variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            mt: "4rem",
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{mainListItems}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={8}>
            <Routes>
              <Route
                exact
                path="/students"
                element={
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width:"150vh"
                      }}
                    >
                      <Students />
                    </Paper>
                  </Grid>
                }
              />
              <Route
                exact
                path="/teachers"
                element={
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "130vh",
                      }}
                    >
                      <Teachers />
                    </Paper>
                  </Grid>
                }
              />
              <Route
                exact
                path="/courses"
                element={
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "130vh",
                      }}
                    >
                      <Courses />
                    </Paper>
                  </Grid>
                }
              />
              <Route
                exact
                path="/courses/detail/:id"
                element={
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "120vh",
                      }}
                    >
                      <Details />
                    </Paper>
                  </Grid>
                }
              />
              <Route
                exact
                path="/payments"
                element={
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100vh",
                      }}
                    >
                      <Payments />
                    </Paper>
                  </Grid>
                }
              />
              <Route
                exact
                path="/dashboard"
                element={
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100vh",
                      }}
                    >
                      <Datas />
                      <PieGraphic />
                    </Paper>
                  </Grid>
                }
              />
              <Route
                exact
                path="/teacher/form"
                element={
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100vh",
                      }}
                    >
                      <FormTeacher />
                    </Paper>
                  </Grid>
                }
              />
              <Route
                exact
                path="/courses/add"
                element={
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "120vh",
                      }}
                    >
                      <Add />
                    </Paper>
                  </Grid>
                }
              />
            </Routes>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
