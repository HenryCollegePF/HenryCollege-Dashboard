import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById, deleteCourse} from "../../redux/store/slices/courses/sliceCourse";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { id } = useParams();

  const { token } = useSelector((state) => state.teacherState);
  const { courseId } = useSelector((state) => state.courseState);

  
  const handlerDelete = (event) =>{
    event.preventDefault()
    dispatch(deleteCourse(id, token))
    navigate("/courses")
  }
  useEffect(() => {
    dispatch(getCourseById(id, token));
  }, [dispatch]);

  return (
    <>
      {courseId?.map((course) => {
        return (
          <Card key={course.id} sx={{ width: "100%" }}>
            <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box >
                <CardMedia
                  sx={{ width: "80%", height: 140 , padding:'3rem'}}
                  image={course.imageSrc}
                  title="course"
                />
                <iframe
                  width="80%"
                  height="140"
                  src="https://www.youtube.com/embed/ABSGBn1-mNM"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </Box>
              <Box sx={{  width: "50%" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ m: "auto" }}
                >
                  Curso : {course.name}{" "}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ m: "auto" }}
                >
                  Duracion : {course.duration}{" "}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ m: "auto" }}
                >
                  Nivel : {course.level}{" "}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ m: "auto" }}
                >
                  Precio: {course.price}{" "}
                </Typography>
                <Typography color="text.secondary" paragraph sx={{ m: "auto" }}>
                  Descripcion :{course.description}{" "}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ m: "auto" }}
                >
                  Tags : {course.tags[0]}{" "}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ m: "auto" }}
                >
                  Profesor : {course.teacher.firstName}{" "}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="small"
                sx={{ color: "black", m: "auto" }}
                color="primary"
                onClick={handlerDelete}
              >
                Delete Course
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
