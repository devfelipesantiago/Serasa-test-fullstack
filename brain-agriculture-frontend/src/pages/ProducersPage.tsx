import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProducersQuery, useDeleteProducerMutation } from '../api/apiSlice';

export const ProducersPage: React.FC = () => {
  const {
    data: producers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProducersQuery();
  const [deleteProducer] = useDeleteProducerMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem a certeza que deseja excluir este produtor?')) {
      await deleteProducer(id);
    }
  };

  let content;

  if (isLoading) {
    content = <p>Carregando produtores...</p>;
  } else if (isSuccess && producers) {
    content = (
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Documento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {producers.map((producer) => (
            <tr key={producer.id}>
              <td>{producer.name}</td>
              <td>{producer.document}</td>
              <td>
                <Link to={`/producers/edit/${producer.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(producer.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (isError) {
    content = <p>Ocorreu um erro: {String(error)}</p>;
  }

  return (
    <div>
      <h1>Lista de Produtores</h1>
      <Link to="/producers/new">
        <button type="button">Adicionar Novo Produtor</button>
      </Link>
      {content}
    </div>
  );
};