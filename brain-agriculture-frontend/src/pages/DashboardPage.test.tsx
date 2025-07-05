import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { vi } from 'vitest';

import { DashboardPage } from './DashboardPage';
import * as apiSlice from '../api/apiSlice';
import type { DashboardData } from '../types/Dashboard';

const mockDashboardData: DashboardData = {
  totalFarms: 10,
  totalArea: 5000,
  stateDistribution: { 'SP': 5, 'MG': 5 },
  cultureDistribution: { 'Soja': 6, 'Milho': 4 },
  landUse: {
    arableArea: 3000,
    vegetationArea: 2000,
  },
};

describe('Componente DashboardPage', () => {
  it('should display "loading" message while data is fetched', () => {
    vi.spyOn(apiSlice, 'useGetDashboardQuery').mockReturnValue({
      data: undefined,
      isLoading: true,
      isSuccess: false,
      isError: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    );

    expect(screen.getByText(/carregando dados do dashboard/i)).toBeInTheDocument();
  });

  it('should display an error message if the search fails', () => {
    vi.spyOn(apiSlice, 'useGetDashboardQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isSuccess: false,
      isError: true,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    );

    expect(screen.getByText(/ocorreu um erro ao carregar o dashboard/i)).toBeInTheDocument();
  });

  it('should render the dashboard data correctly on success', () => {
    vi.spyOn(apiSlice, 'useGetDashboardQuery').mockReturnValue({
      data: mockDashboardData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    );

    expect(screen.getByText('Total de Fazendas')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText('Área Total (ha)')).toBeInTheDocument();
    expect(screen.getByText('5.000')).toBeInTheDocument();

    expect(screen.getByText('Distribuição por Estado')).toBeInTheDocument();
    expect(screen.getByText('Distribuição por Cultura')).toBeInTheDocument();
    expect(screen.getByText('Uso de Solo (ha)')).toBeInTheDocument();
  });
});