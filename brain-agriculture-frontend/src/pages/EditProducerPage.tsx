import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProducerQuery } from '../api/apiSlice';
import { EditProducerForm } from '../components/EditProducerForm';

export const EditProducerPage: React.FC = () => {
  const { producerId } = useParams<{ producerId: string }>();
  const { data: producer, isLoading } = useGetProducerQuery(producerId!);

  if (isLoading) {
    return <p>Carregando dados do produtor...</p>;
  }

  if (!producer) {
    return <p>Produtor não encontrado!</p>;
  }

  return <EditProducerForm producer={producer} />;
};