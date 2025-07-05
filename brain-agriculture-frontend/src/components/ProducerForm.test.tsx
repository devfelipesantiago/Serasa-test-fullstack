import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../app/store';
import { vi } from 'vitest';

import { ProducerForm } from './ProducerForm';
import * as apiSlice from '../api/apiSlice';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Componente ProducerForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('must allow the user to complete and submit the form', async () => {
        const user = userEvent.setup();
        
        const mockUnwrap = vi.fn().mockResolvedValue({});
        const mockAddProducer = vi.fn().mockReturnValue({
            unwrap: mockUnwrap,
        });

        // CORREÇÃO AQUI: Adicionamos a propriedade 'reset' que faltava.
        vi.spyOn(apiSlice, 'useAddProducerMutation').mockImplementation(() => [
            mockAddProducer,
            { isLoading: false, error: undefined, reset: vi.fn() },
        ]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProducerForm />
                </BrowserRouter>
            </Provider>
        );

        const nameInput = screen.getByLabelText(/nome/i);
        const documentInput = screen.getByLabelText(/cpf ou cnpj/i);
        const saveButton = screen.getByRole('button', { name: /salvar produtor/i });

        expect(saveButton).toBeDisabled();
        
        await user.type(nameInput, 'Fazendeiro Teste');
        await user.type(documentInput, '12345678900');

        expect(saveButton).not.toBeDisabled();
        
        await user.click(saveButton);
        
        expect(mockAddProducer).toHaveBeenCalledTimes(1);
        expect(mockAddProducer).toHaveBeenCalledWith({
            name: 'Fazendeiro Teste',
            document: '12345678900',
        });
        
        expect(mockUnwrap).toHaveBeenCalledTimes(1);
        
        expect(mockNavigate).toHaveBeenCalledWith('/producers');
    });
});