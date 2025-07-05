import React, { useState, useEffect } from 'react';
import { useUpdateProducerMutation } from '../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import type { Producer } from '../types/Producer';

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
    <form onSubmit={handleSubmit}>
      <h2>Editar Produtor</h2>
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Atualizando...' : 'Salvar Alterações'}
      </button>
    </form>
  );
};