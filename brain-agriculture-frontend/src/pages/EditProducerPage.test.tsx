import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../app/store';
import { vi } from 'vitest';

import { EditProducerPage } from './EditProducerPage';
import * as apiSlice from '../api/apiSlice';
import type { Producer } from '../types/Producer';

const mockProducer: Producer = {
  id: '1',
  name: 'João Agricultor',
  document: '11122233344',
  farms: [],
};

describe('Página EditProducerPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must load the data, allow editing and submit the changes', async () => {
    const user = userEvent.setup();

    vi.spyOn(apiSlice, 'useGetProducerQuery').mockReturnValue({
      data: mockProducer,
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetch: vi.fn(),
    });

    const mockUnwrap = vi.fn().mockResolvedValue({});
    const mockUpdateProducer = vi.fn().mockReturnValue({
      unwrap: mockUnwrap,
    });
    vi.spyOn(apiSlice, 'useUpdateProducerMutation').mockImplementation(() => [
        mockUpdateProducer,
        { isLoading: false, reset: vi.fn() }
    ]);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/producers/edit/1']}>
          <Routes>
            <Route path="/producers/edit/:producerId" element={<EditProducerPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const nameInput = await screen.findByDisplayValue('João Agricultor');
    expect(nameInput).toBeInTheDocument();
    expect(screen.getByDisplayValue('11122233344')).toBeInTheDocument();

    await user.clear(nameInput);
    await user.type(nameInput, 'João Agricultor Editado');

    const saveButton = screen.getByRole('button', { name: /salvar alterações/i });
    await user.click(saveButton);

    expect(mockUpdateProducer).toHaveBeenCalledTimes(1);
    expect(mockUpdateProducer).toHaveBeenCalledWith({
      id: '1',
      name: 'João Agricultor Editado',
      document: '11122233344',
    });
  });
});