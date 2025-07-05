import React, { useState, useEffect } from 'react';
import { useUpdateProducerMutation } from '../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import type { Producer } from '../types/Producer';
import { StyledForm, FormGroup, Label, Input, FormActions } from './FormComponents';

interface EditProducerFormProps {
  producer: Producer;
}

export const EditProducerForm: React.FC<EditProducerFormProps> = ({ producer }) => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [updateProducer, { isLoading }] = useUpdateProducerMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (producer) {
      setName(producer.name);
      setDocument(producer.document);
    }
  }, [producer]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateProducer({ id: producer.id, name, document }).unwrap();
      navigate('/producers');
    } catch (err) {
      console.error('Falha ao atualizar o produtor: ', err);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Editar Produtor</h2>
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
        />
      </FormGroup>
      <FormActions>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Atualizando...' : 'Salvar Alterações'}
        </button>
      </FormActions>
    </StyledForm>
  );
};