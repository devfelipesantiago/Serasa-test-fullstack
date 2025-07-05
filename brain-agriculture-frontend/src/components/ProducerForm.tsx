import React, { useState } from 'react';
import { useAddProducerMutation } from '../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { StyledForm, FormGroup, Label, Input, FormActions } from './FormComponents';
import styled from 'styled-components';

const ErrorMessage = styled.p`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const ProducerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [addProducer, { isLoading }] = useAddProducerMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const canSave = [name, document].every(Boolean) && !isLoading;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        setError('');
        const cleanedDocument = document.replace(/\D/g, '');
        await addProducer({ name, document: cleanedDocument }).unwrap();
        
        setName('');
        setDocument('');
        navigate('/producers');
      } catch (err: any) {
        console.error('Falha ao salvar o produtor: ', err);
        const errorMessage = err.data?.message || 'Ocorreu um erro desconhecido.';
        setError(errorMessage);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Cadastrar Novo Produtor</h2>
      <FormGroup>
        <Label htmlFor="producerName">Nome:</Label>
        <Input
          type="text"
          id="producerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="producerDocument">CPF ou CNPJ:</Label>
        <Input
          type="text"
          id="producerDocument"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="Digite apenas os números"
        />
      </FormGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <FormActions>
        <button type="submit" disabled={!canSave}>
          {isLoading ? 'Salvando...' : 'Salvar Produtor'}
        </button>
      </FormActions>
    </StyledForm>
  );
};