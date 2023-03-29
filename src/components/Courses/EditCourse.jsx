import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById } from "../../redux/store/slices/courses/sliceCourse";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function MediaCard() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { authToken } = useSelector((state) => state.teacherState);
  const { courseId } = useSelector((state) => state.courseState);

  useEffect(() => {
    dispatch(getCourseById(id, authToken));
  }, [dispatch]);

  return (
    <>
    <h1>Hola{id}</h1>
      {courseId?.map((course) => {
        return (
          <Card
            key={course.id}
            sx={{ maxWidth: 945, display: "flex", flexWrap: "wrap" }}
          >
            <CardContent>
              <CardMedia
                sx={{ width: '30%',height: 140 }}
                image={course.imageSrc}
                title="course"
              />
              <Typography gutterBottom variant="h5" component="div">
                Name : {course.name}{" "}
                <Button color="secondary" variant="outlined" size="small">
                  ...
                </Button>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Duration : {course.duration}{" "}
                <Button color="secondary" variant="outlined" size="small">
                  ...
                </Button>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Level : {course.level}{" "}
                <Button color="secondary" variant="outlined" size="small">
                  ...
                </Button>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Price: {course.price}{" "}
                <Button color="secondary" variant="outlined" size="small">
                  ...
                </Button>
              </Typography>
              <Typography color="text.secondary" paragraph>
                Description :{course.description}{" "}
                <Button color="secondary" variant="outlined" size="small">
                  ...
                </Button>
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Tags : {course.tags[0]}{" "}
                <Button color="secondary" variant="outlined" size="small">
                  ...
                </Button>
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Teacher : {course.teacher.firstName}{" "}
                <Button color="secondary" variant="outlined" size="small">
                  ...
                </Button>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" sx={{ bgcolor: "#ffff00", color: "white" }}>
                Share
              </Button>
              <Button size="small" sx={{ bgcolor: "#ffff00", color: "white" }}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
