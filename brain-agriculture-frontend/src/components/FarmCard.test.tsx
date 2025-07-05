import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FarmCard } from './FarmCard';
import type { Farm } from '../types/Farm';

const mockFarm: Farm = {
  id: '1',
  name: 'Fazenda Sol Nascente',
  city: 'Ribeirão Preto',
  state: 'SP',
  totalAreaHectares: 1000,
  arableAreaHectares: 700,
  vegetationAreaHectares: 300,
  cultures: ['Soja', 'Café'],
};

describe('Componente FarmCard', () => {
  it('should render farm information correctly', () => {
    render(
      <FarmCard 
        farm={mockFarm}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Fazenda Sol Nascente')).toBeInTheDocument();
    expect(screen.getByText('Localização:')).toBeInTheDocument();
    expect(screen.getByText('Ribeirão Preto - SP')).toBeInTheDocument();
    expect(screen.getByText(/1000 ha/i)).toBeInTheDocument();
    expect(screen.getByText(/700 ha/i)).toBeInTheDocument();
    expect(screen.getByText(/300 ha/i)).toBeInTheDocument();
    expect(screen.getByText('Soja')).toBeInTheDocument();
    expect(screen.getByText('Café')).toBeInTheDocument();
  });

  it('should render the edit and delete buttons', () => {
    render(
      <FarmCard 
        farm={mockFarm} 
        onEdit={() => {}} 
        onDelete={() => {}} 
      />
    );

    const editButton = screen.getByRole('button', { name: /editar fazenda/i });
    const deleteButton = screen.getByRole('button', { name: /excluir fazenda/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});