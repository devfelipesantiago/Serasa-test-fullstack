import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../app/store';
import { vi } from 'vitest';

import { ProducersPage } from './ProducersPage';
import * as apiSlice from '../api/apiSlice';
import type { Producer } from '../types/Producer';

const mockProducers: Producer[] = [
  { id: '1', name: 'Produtor Um', document: '11111111111', farms: [] },
  { id: '2', name: 'Produtor Dois', document: '22222222222', farms: [] },
];

describe('Page ProducersPage', () => {
  beforeEach(() => {
    window.confirm = vi.fn(() => true); 
    vi.clearAllMocks();
  });

  it('should render the list of producers successfully', () => {
    vi.spyOn(apiSlice, 'useGetProducersQuery').mockReturnValue({
      data: mockProducers,
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetch: vi.fn(),
    });
    vi.spyOn(apiSlice, 'useDeleteProducerMutation').mockImplementation(() => [vi.fn(), { isLoading: false, reset: vi.fn() }]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProducersPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Produtor Um')).toBeInTheDocument();
    expect(screen.getByText('Produtor Dois')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar novo produtor/i })).toBeInTheDocument();
  });

  it('should call the delete mutation when the delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockDeleteProducer = vi.fn().mockResolvedValue({});

    vi.spyOn(apiSlice, 'useGetProducersQuery').mockReturnValue({
      data: mockProducers,
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetch: vi.fn(),
    });
    vi.spyOn(apiSlice, 'useDeleteProducerMutation').mockImplementation(() => [mockDeleteProducer, { isLoading: false, reset: vi.fn() }]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProducersPage />
        </BrowserRouter>
      </Provider>
    );

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i });
    await user.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(mockDeleteProducer).toHaveBeenCalledTimes(1);
      expect(mockDeleteProducer).toHaveBeenCalledWith('1');
    });
  });
});