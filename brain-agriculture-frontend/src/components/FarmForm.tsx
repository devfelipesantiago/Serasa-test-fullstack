import React, { useState, useEffect } from 'react';
import { useAddFarmMutation } from '../api/apiSlice';
import type { Farm } from '../types/Farm';

interface FarmFormProps {
  producerId: string;
  onClose: () => void;
  farmToEdit?: Farm;
}

export const FarmForm: React.FC<FarmFormProps> = ({ producerId, onClose, farmToEdit }) => {
  const [formState, setFormState] = useState({
    name: '',
    city: '',
    state: '',
    totalAreaHectares: 0,
    arableAreaHectares: 0,
    vegetationAreaHectares: 0,
    cultures: [] as string[],
  });
  const [areaError, setAreaError] = useState('');
  const [currentCulture, setCurrentCulture] = useState('');

  const [addFarm, { isLoading }] = useAddFarmMutation();

  useEffect(() => {
    const { totalAreaHectares, arableAreaHectares, vegetationAreaHectares } = formState;
    if (arableAreaHectares + vegetationAreaHectares > totalAreaHectares) {
      setAreaError('A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.');
    } else {
      setAreaError('');
    }
  }, [formState.totalAreaHectares, formState.arableAreaHectares, formState.vegetationAreaHectares]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name.includes('Area') ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddCulture = () => {
    if (currentCulture && !formState.cultures.includes(currentCulture)) {
      setFormState(prevState => ({
        ...prevState,
        cultures: [...prevState.cultures, currentCulture],
      }));
      setCurrentCulture('');
    }
  };

  const handleRemoveCulture = (cultureToRemove: string) => {
    setFormState(prevState => ({
      ...prevState,
      cultures: prevState.cultures.filter(culture => culture !== cultureToRemove),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (areaError) {
      alert('Por favor, corrija os erros no formulário.');
      return;
    }
    try {
      await addFarm({ producerId, farmData: formState }).unwrap();
      onClose();
    } catch (err) {
      console.error('Falha ao salvar a fazenda: ', err);
    }
  };

  return (
    <div style={{ border: '1px solid #007bff', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <h3>Nova Fazenda</h3>
        <input name="name" value={formState.name} onChange={handleChange} placeholder="Nome da Fazenda" required />
        <input name="city" value={formState.city} onChange={handleChange} placeholder="Cidade" required />
        <input name="state" value={formState.state} onChange={handleChange} placeholder="Estado" required />
        <input name="totalAreaHectares" value={formState.totalAreaHectares} onChange={handleChange} type="number" placeholder="Área Total (ha)" required />
        <input name="arableAreaHectares" value={formState.arableAreaHectares} onChange={handleChange} type="number" placeholder="Área Agricultável (ha)" required />
        <input name="vegetationAreaHectares" value={formState.vegetationAreaHectares} onChange={handleChange} type="number" placeholder="Área de Vegetação (ha)" required />
        {areaError && <p style={{ color: 'red' }}>{areaError}</p>}

        <div>
          <h4>Culturas</h4>
          <input value={currentCulture} onChange={(e) => setCurrentCulture(e.target.value)} placeholder="Adicionar cultura" />
          <button type="button" onClick={handleAddCulture}>Adicionar</button>
          <ul>
            {formState.cultures.map(culture => (
              <li key={culture}>
                {culture} <button type="button" onClick={() => handleRemoveCulture(culture)}>X</button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" disabled={!!areaError || isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Fazenda'}
        </button>
        <button type="button" onClick={onClose} style={{ marginLeft: '8px' }}>Cancelar</button>
      </form>
    </div>
  );
};