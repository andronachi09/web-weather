import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the components that ChartJS needs to render a line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define the type for your chart data for TypeScript
type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
};

// Define the type for the chart options
// type ChartOptions = {
//   responsive: boolean;
//   plugins: {
//     tooltip: TooltipOptions;
//   };
//   scales: {
//     y: {
//       beginAtZero: boolean;
//     };
//   };
// };

const LineChart: React.FC = () => {
  const data: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Humidity',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      } as Partial<TooltipOptions>,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
