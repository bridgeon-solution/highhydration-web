import React from 'react'
import {Radar} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const RadarChart = () => {
  return (
     < Radar  data={chartData} />
  )
}

export default RadarChart