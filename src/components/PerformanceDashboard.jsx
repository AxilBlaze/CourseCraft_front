import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale
);

const PerformanceDashboard = ({ studentData }) => {
  const data = {
    labels: studentData.map(student => student.name),
    datasets: [
      {
        label: 'Scores',
        data: studentData.map(student => student.score),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-purple-600 mb-2">
        Student Performance Dashboard
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PerformanceDashboard;
