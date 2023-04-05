import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell,Pie,PieChart } from 'recharts';
import { allStudents } from '../../redux/store/slices/students/sliceStudent';
import { getAllCourses } from '../../redux/store/slices/courses/sliceCourse';
import { getAllTeachers } from '../../redux/store/slices/teachers/sliceTeacher';


const PieGraphic = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(allStudents(token))
    dispatch(getAllCourses(token))
    dispatch(getAllTeachers(token))
  },[dispatch])
  const {token} = useSelector(state=>state.teacherState)
  
  const student = useSelector(state=>state.studentState.list)
  const course = useSelector(state=>state.courseState.list)
  const teacher = useSelector(state=>state.teacherState.list)
  
  const data = [
    { name: "Teachers", value: teacher.length },
    { name: "Estudents", value: student.length },
    { name: "Courses", value: course.length },
    { name: "Cupos", value: 10 }
    ];
    
    const COLORS = ["#fff59d", "#90caf9", "#f3e5f5", "#ffab91"];
    const COLORSDOS = ["black", "black", "black", "black"];
    
	return <PieChart width={500} height={400}>
      <Pie
        data={data}
        cx={300}
        cy={200}
        labelLine={false}
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index
        }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          return (
            <text
              x={x}
              y={y}
              fill={COLORSDOS[index % COLORSDOS.length]}
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {data[index].name} ({value})
            </text>
          );
        }}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
};

export default PieGraphic;
