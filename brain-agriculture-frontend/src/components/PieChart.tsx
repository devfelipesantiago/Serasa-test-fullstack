import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

interface PieChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: ChartDataset[];
  };
}

export const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
  return (
    <div style={{ width: '300px', height: '300px', margin: '20px' }}>
      <h3>{title}</h3>
      <Pie data={data} />
    </div>
  );
};