import React from 'react';
import type { Farm } from '../types/Farm';

interface FarmCardProps {
  farm: Farm;
  onEdit: () => void;
  onDelete: () => void;
}

export const FarmCard: React.FC<FarmCardProps> = ({ farm, onEdit, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
      <h3>{farm.name}</h3>
      <p>
        <strong>Localização:</strong> {farm.city} - {farm.state}
      </p>
      <p>
        <strong>Área Total:</strong> {farm.totalAreaHectares} ha
      </p>
      <p>
        <strong>Área Agricultável:</strong> {farm.arableAreaHectares} ha
      </p>
      <p>
        <strong>Área de Vegetação:</strong> {farm.vegetationAreaHectares} ha
      </p>
      <div>
        <strong>Culturas:</strong>
        {farm.cultures.length > 0 ? (
          <ul>
            {farm.cultures.map((culture, index) => (
              <li key={index}>{culture}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma cultura cadastrada.</p>
        )}
      </div>
      <div style={{ marginTop: '16px' }}>
        <button onClick={onEdit}>Editar Fazenda</button>
        <button onClick={onDelete} style={{ marginLeft: '8px' }}>Excluir Fazenda</button>
      </div>
    </div>
  );
};