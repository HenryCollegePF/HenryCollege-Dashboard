import React from 'react';
import { Cell,Pie,PieChart } from 'recharts';

const data = [
	{ name: "Group A", value: 600 },
	{ name: "Group B", value: 300 },
	{ name: "Group C", value: 300 },
	{ name: "Group D", value: 200 }
  ];
  
  const COLORS = ["#fff59d", "#90caf9", "#f3e5f5", "#ffab91"];
  const COLORSDOS = ["black", "black", "black", "black"];

const PieGraphic = () => {
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
