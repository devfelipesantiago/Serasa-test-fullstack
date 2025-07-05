import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { vi } from 'vitest';

import { FarmForm } from './FarmForm';
import * as apiSlice from '../api/apiSlice';

describe('Componente FarmForm', () => {
  beforeEach(() => {
    vi.spyOn(apiSlice, 'useAddFarmMutation').mockReturnValue([vi.fn(), { isLoading: false, reset: vi.fn() }]);
    vi.spyOn(apiSlice, 'useUpdateFarmMutation').mockReturnValue([vi.fn(), { isLoading: false, reset: vi.fn() }]);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display an error when the sum of the areas is greater than the total area', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <FarmForm producerId="1" onClose={() => {}} />
      </Provider>
    );

    const totalAreaInput = screen.getByLabelText(/área total/i);
    const arableAreaInput = screen.getByLabelText(/área agricultável/i);
    const vegetationAreaInput = screen.getByLabelText(/área de vegetação/i);
    const saveButton = screen.getByRole('button', { name: /salvar fazenda/i });

    await user.type(totalAreaInput, '100');
    await user.type(arableAreaInput, '70');
    await user.type(vegetationAreaInput, '40');

    const errorMessage = await screen.findByText(/A soma das áreas agricultável e de vegetação não pode ultrapassar a área total./i);
    expect(errorMessage).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });

  it('should allow adding and removing crops', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <FarmForm producerId="1" onClose={() => {}} />
      </Provider>
    );

    const cultureInput = screen.getByPlaceholderText(/ex: soja/i);
    const addButton = screen.getByRole('button', { name: /adicionar/i });

    await user.type(cultureInput, 'Soja');
    await user.click(addButton);

    expect(screen.getByText('Soja')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /×/i });
    await user.click(removeButton);

    expect(screen.queryByText('Soja')).not.toBeInTheDocument();
  });
}); 