import React from 'react';
import { useGetProducersQuery } from '../api/apiSlice';

export const ProducersPage: React.FC = () => {
  const {
    data: producers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProducersQuery();

  let content;

  if (isLoading) {
    content = <p>Carregando produtores...</p>;
  } else if (isSuccess && producers) {
    content = (
      <ul>
        {producers.map((producer) => (
          <li key={producer.id}>
            {producer.name} - ({producer.cpfCnpj})
          </li>
        ))}
      </ul>
    );
  } else if (isError) {
    content = <p>Ocorreu um erro: {String(error)}</p>;
  }

  return (
    <div>
      <h1>Lista de Produtores</h1>
      {content}
    </div>
  );
};