import React, { useState } from 'react';
import { useAddProducerMutation } from '../api/apiSlice';
import { useNavigate } from 'react-router-dom';

export const ProducerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [addProducer, { isLoading }] = useAddProducerMutation();
  const navigate = useNavigate();

  const canSave = [name, document].every(Boolean) && !isLoading;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        await addProducer({ name, document }).unwrap();
        setName('');
        setDocument('');
        navigate('/producers');
      } catch (err) {
        console.error('Falha ao salvar o produtor: ', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Novo Produtor</h2>
      <div>
        <label htmlFor="producerName">Nome:</label>
        <input
          type="text"
          id="producerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="producerDocument">CPF ou CNPJ:</label>
        <input
          type="text"
          id="producerDocument"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
        />
      </div>
      <button type="submit" disabled={!canSave}>
        {isLoading ? 'Salvando...' : 'Salvar Produtor'}
      </button>
    </form>
  );
};