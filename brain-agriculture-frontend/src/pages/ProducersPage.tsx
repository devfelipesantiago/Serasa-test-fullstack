import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGetProducersQuery, useDeleteProducerMutation } from '../api/apiSlice';

const ProducersContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #dee2e6;

  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #e9ecef;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 15px;
  vertical-align: middle;
`;

const ActionsCell = styled(TableCell)`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
    background-color: #ffc107;
    &:hover {
        background-color: #e0a800;
    }
`;

const DeleteButton = styled.button`
    background-color: #dc3545;
    &:hover {
        background-color: #c82333;
    }
`;


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
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Documento</TableHeader>
            <TableHeader>Ações</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {producers.map((producer) => (
            <TableRow key={producer.id}>
              <TableCell>{producer.name}</TableCell>
              <TableCell>{producer.document}</TableCell>
              <ActionsCell>
                <Link to={`/producers/edit/${producer.id}`}>
                  <EditButton>Editar</EditButton>
                </Link>
                <DeleteButton onClick={() => handleDelete(producer.id)}>Excluir</DeleteButton>
              </ActionsCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    );
  } else if (isError) {
    content = <p>Ocorreu um erro: {String(error)}</p>;
  }

  return (
    <ProducersContainer>
      <Header>
        <h1>Lista de Produtores</h1>
        <Link to="/producers/new">
          <button type="button">Adicionar Novo Produtor</button>
        </Link>
      </Header>
      {content}
    </ProducersContainer>
  );
};