import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProducerQuery, useDeleteFarmMutation } from '../api/apiSlice';
import { EditProducerForm } from '../components/EditProducerForm';
import { FarmCard } from '../components/FarmCard';
import { FarmForm } from '../components/FarmForm';

export const EditProducerPage: React.FC = () => {
  const { producerId } = useParams<{ producerId: string }>();
  const { data: producer, isLoading } = useGetProducerQuery(producerId!);
  const [deleteFarm] = useDeleteFarmMutation();
  const [showFarmForm, setShowFarmForm] = useState(false);

  const handleDeleteFarm = async (farmId: string) => {
    if (window.confirm('Tem a certeza que deseja excluir esta fazenda?')) {
      await deleteFarm({ producerId: producerId!, farmId });
    }
  };

  if (isLoading) {
    return <p>Carregando dados do produtor...</p>;
  }

  if (!producer) {
    return <p>Produtor não encontrado!</p>;
  }

  return (
    <div>
      <EditProducerForm producer={producer} />
      <hr style={{ margin: '32px 0' }} />
      <h2>Fazendas de {producer.name}</h2>

      {showFarmForm && (
        <FarmForm
          producerId={producer.id}
          onClose={() => setShowFarmForm(false)}
        />
      )}

      {!showFarmForm && (
        <button onClick={() => setShowFarmForm(true)} style={{ marginTop: '16px' }}>
          Adicionar Nova Fazenda
        </button>
      )}

      {producer.farms && producer.farms.length > 0 ? (
        producer.farms.map((farm) => (
          <FarmCard
            key={farm.id}
            farm={farm}
            onEdit={() => alert(`Editar fazenda ${farm.name}`)}
            onDelete={() => handleDeleteFarm(farm.id)}
          />
        ))
      ) : (
        <p>Nenhuma fazenda cadastrada para este produtor.</p>
      )}
    </div>
  );
};