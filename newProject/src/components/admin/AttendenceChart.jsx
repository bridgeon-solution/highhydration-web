import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    day: "Monday",
    present: 120,
    absent: 30,
    totalStudents: 150,
  },
  {
    day: "Tuesday",
    present: 98,
    absent: 52,
    totalStudents: 150,
  },
  {
    day: "Wednesday",
    present: 86,
    absent: 64,
    totalStudents: 150,
  },
  {
    day: "Thursday",
    present: 99,
    absent: 51,
    totalStudents: 150,
  },
  {
    day: "Friday",
    present: 85,
    absent: 65,
    totalStudents: 150,
  },
  {
    day: "Saturday",
    present: 65,
    absent: 85,
    totalStudents: 150,
  },
  {
    day: "Sunday",
    present: 0, // Assuming no data for Sunday, set to 0
    absent: 0, // Assuming no data for Sunday, set to 0
    totalStudents: 150,
  },
];

const AttendenceChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="day" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="present"
          stroke="red"
          fill="green"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default AttendenceChart;
