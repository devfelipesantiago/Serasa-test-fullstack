import React from 'react';
import { useGetDashboardQuery } from '../api/apiSlice';
import { PieChart } from '../components/PieChart';

export const DashboardPage: React.FC = () => {
  const { data: dashboardData, isLoading, isError, isSuccess } = useGetDashboardQuery();

  if (isLoading) {
    return <p>Carregando dados do dashboard...</p>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar o dashboard.</p>;
  }

  if (isSuccess && dashboardData) {
    const stateChartData = {
      labels: Object.keys(dashboardData.stateDistribution),
      datasets: [
        {
          label: '# de Fazendas',
          data: Object.values(dashboardData.stateDistribution),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
          borderWidth: 1,
        },
      ],
    };

    const cultureChartData = {
      labels: Object.keys(dashboardData.cultureDistribution),
      datasets: [
        {
          label: '# de Fazendas',
          data: Object.values(dashboardData.cultureDistribution),
          backgroundColor: ['#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB', '#C9CBCF'],
          borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
          borderWidth: 1,
        },
      ],
    };

    const landUseChartData = {
      labels: ['Área Agricultável (ha)', 'Área de Vegetação (ha)'],
      datasets: [
        {
          label: 'Uso de Solo (ha)',
          data: [dashboardData.landUse.arableArea, dashboardData.landUse.vegetationArea],
          backgroundColor: ['#2ECC71', '#27AE60'],
          borderColor: ['#FFFFFF', '#FFFFFF'],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ border: '1px solid #ddd', padding: '20px' }}>
            <h2>Total de Fazendas</h2>
            <p style={{ fontSize: '24px' }}>{dashboardData.totalFarms}</p>
          </div>
          <div style={{ border: '1px solid #ddd', padding: '20px' }}>
            <h2>Área Total (ha)</h2>
            <p style={{ fontSize: '24px' }}>{dashboardData.totalArea.toLocaleString('pt-BR')}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <PieChart title="Distribuição por Estado" data={stateChartData} />
          <PieChart title="Distribuição por Cultura" data={cultureChartData} />
          <PieChart title="Uso de Solo (ha)" data={landUseChartData} />
        </div>
      </div>
    );
  }

  return null;
};