import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAddFarmMutation, useUpdateFarmMutation } from '../api/apiSlice';
import type { Farm } from '../types/Farm';
import { StyledForm, FormGroup, Label, Input, FormActions } from './FormComponents';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const CultureManager = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const CultureInputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const CultureList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 10px;
`;

const CultureTag = styled.li`
  background-color: #e9ecef;
  padding: 5px 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

interface FarmFormProps {
  producerId: string;
  onClose: () => void;
  farmToEdit?: Farm;
}

const initialState = {
  name: '',
  city: '',
  state: '',
  totalAreaHectares: 0,
  arableAreaHectares: 0,
  vegetationAreaHectares: 0,
  cultures: [] as string[],
};

export const FarmForm: React.FC<FarmFormProps> = ({ producerId, onClose, farmToEdit }) => {
  const [formState, setFormState] = useState(initialState);
  const [areaError, setAreaError] = useState('');
  const [currentCulture, setCurrentCulture] = useState('');

  const [addFarm, { isLoading: isAdding }] = useAddFarmMutation();
  const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmMutation();

  const isEditMode = Boolean(farmToEdit);

  useEffect(() => {
    if (isEditMode && farmToEdit) {
      setFormState(farmToEdit);
    } else {
      setFormState(initialState);
    }
  }, [farmToEdit, isEditMode]);

  useEffect(() => {
    const { totalAreaHectares, arableAreaHectares, vegetationAreaHectares } = formState;
    if (arableAreaHectares + vegetationAreaHectares > totalAreaHectares) {
      setAreaError('A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.');
    } else {
      setAreaError('');
    }
  }, [formState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name.includes('Area') ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddCulture = () => {
    if (currentCulture && !formState.cultures.includes(currentCulture)) {
      setFormState(prevState => ({ ...prevState, cultures: [...prevState.cultures, currentCulture] }));
      setCurrentCulture('');
    }
  };

  const handleRemoveCulture = (cultureToRemove: string) => {
    setFormState(prevState => ({ ...prevState, cultures: prevState.cultures.filter(c => c !== cultureToRemove) }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (areaError) {
      alert('Por favor, corrija os erros no formulário.');
      return;
    }

    try {
      if (isEditMode && farmToEdit) {
        await updateFarm({ producerId, farmId: farmToEdit.id, farmData: formState }).unwrap();
      } else {
        await addFarm({ producerId, farmData: formState }).unwrap();
      }
      onClose();
    } catch (err) {
      console.error('Falha ao salvar a fazenda: ', err);
    }
  };

  const isLoading = isAdding || isUpdating;

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3>{isEditMode ? 'Editar Fazenda' : 'Nova Fazenda'}</h3>
      <FormGrid>
        <FormGroup>
          <Label>Nome da Fazenda</Label>
          <Input name="name" value={formState.name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Cidade</Label>
          <Input name="city" value={formState.city} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Estado</Label>
          <Input name="state" value={formState.state} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Área Total (ha)</Label>
          <Input name="totalAreaHectares" value={formState.totalAreaHectares} onChange={handleChange} type="number" required />
        </FormGroup>
        <FormGroup>
          <Label>Área Agricultável (ha)</Label>
          <Input name="arableAreaHectares" value={formState.arableAreaHectares} onChange={handleChange} type="number" required />
        </FormGroup>
        <FormGroup>
          <Label>Área de Vegetação (ha)</Label>
          <Input name="vegetationAreaHectares" value={formState.vegetationAreaHectares} onChange={handleChange} type="number" required />
        </FormGroup>
      </FormGrid>
      {areaError && <p style={{ color: 'red', gridColumn: '1 / -1' }}>{areaError}</p>}

      <CultureManager>
        <Label>Culturas</Label>
        <CultureInputGroup>
          <Input value={currentCulture} onChange={(e) => setCurrentCulture(e.target.value)} placeholder="Ex: Soja" />
          <button type="button" onClick={handleAddCulture}>Adicionar</button>
        </CultureInputGroup>
        <CultureList>
          {formState.cultures.map(culture => (
            <CultureTag key={culture}>
              {culture} 
              <button type="button" onClick={() => handleRemoveCulture(culture)} style={{ background: 'none', color: '#dc3545', fontSize: '18px', padding: '0 5px' }}>×</button>
            </CultureTag>
          ))}
        </CultureList>
      </CultureManager>

      <FormActions>
        <button type="submit" disabled={!!areaError || isLoading}>
          {isLoading ? 'Salvando...' : `Salvar ${isEditMode ? 'Alterações' : 'Fazenda'}`}
        </button>
        <button type="button" onClick={onClose} style={{ backgroundColor: '#6c757d' }}>Cancelar</button>
      </FormActions>
    </StyledForm>
  );
};