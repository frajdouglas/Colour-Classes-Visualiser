import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Histogram.css";
import {data} from '../data'
import {labels} from '../labels'
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Histogram = () => {
  console.log(labels)
  let orderedDataArray = data.sort()
  console.log(orderedDataArray)
let xLabels = []
  for (let i=0; i < orderedDataArray.length; i++) {
    xLabels.push(1)
  }
console.log(xLabels)
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const dataSetup = {
    labels : xLabels,
    datasets: [
      {
        label: "shape_area",
        data: orderedDataArray,
        backgroundColor: "rgb(24,183,208)",
      },
    ],
  };

    return (
      <div className="ChartContainer">
        <Bar options={options} data={dataSetup} />
      </div>
    );
  }


export default Histogram;
