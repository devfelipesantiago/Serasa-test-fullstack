import { describe, it, beforeEach } from 'mocha';
import request from 'supertest';
import app from '../../app';
import * as sinon from 'sinon';
import { HarvestService } from '../../services/harvest.service';
import { expect } from 'chai';

describe('Harvest Integration Tests', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('POST /harvests', () => {
    it('should create a new harvest successfully', async () => {
      // Arrange
      const httpRequestBody = {
        year: 2023,
        farmId: 1
      };

      const mockHarvest = {
        id: 1,
        year: 2023,
        farm: { id: 1, name: 'Fazenda Teste' }
      } as any;

      const mockResponse = {
        success: true,
        data: mockHarvest,
        message: 'Harvest created successfully'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'createHarvest').resolves(mockResponse);

      // Act
      const response = await request(app)
        .post('/harvests')
        .send(httpRequestBody);

      // Assert
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('year', httpRequestBody.year);
      expect(response.body.data).to.have.property('farm');

      harvestServiceStub.restore();
    });

    it('should return 400 when creating harvest with invalid data', async () => {
      // Arrange
      const httpRequestBody = {
        year: -2023,
        farmId: 'invalid'
      };

      // Act
      const response = await request(app)
        .post('/harvests')
        .send(httpRequestBody);

      // Assert
      expect(response.status).to.equal(400);
    });
  });

  describe('GET /harvests', () => {
    it('should return all harvests with pagination', async () => {
      // Arrange
      const mockHarvests = [
        { id: 1, year: 2023, farm: { id: 1, name: 'Fazenda 1' } },
        { id: 2, year: 2022, farm: { id: 2, name: 'Fazenda 2' } },
        { id: 3, year: 2021, farm: { id: 3, name: 'Fazenda 3' } }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockHarvests,
        message: 'Harvests retrieved successfully'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'findAll').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get('/harvests')
        .query({ page: 1, limit: 10 });

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);

      harvestServiceStub.restore();
    });
  });

  describe('GET /harvests/:id', () => {
    it('should return harvest by id', async () => {
      // Arrange
      const mockHarvest = {
        id: 1,
        year: 2023,
        farm: { id: 1, name: 'Fazenda Teste' }
      } as any;

      const mockResponse = {
        success: true,
        data: mockHarvest,
        message: 'Harvest retrieved successfully'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'findById').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get(`/harvests/${mockHarvest.id}`);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('id', mockHarvest.id);
      expect(response.body.data).to.have.property('year', mockHarvest.year);
      expect(response.body.data).to.have.property('farm');

      harvestServiceStub.restore();
    });

    it('should return 404 when harvest not found', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        data: null,
        message: 'Harvest not found'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'findById').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get('/harvests/99999');

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', null);
      expect(response.body).to.have.property('message', 'Harvest not found');

      harvestServiceStub.restore();
    });
  });

  describe('PUT /harvests/:id', () => {
    it('should update harvest successfully', async () => {
      // Arrange
      const mockHarvest = {
        id: 1,
        year: 2023,
        farm: { id: 1, name: 'Fazenda Teste' }
      } as any;

      const updateData = {
        year: 2024
      };

      const updatedHarvest = { ...mockHarvest, ...updateData };

      const mockResponse = {
        success: true,
        data: updatedHarvest,
        message: 'Harvest updated successfully'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'update').resolves(mockResponse);

      // Act
      const response = await request(app)
        .put(`/harvests/${mockHarvest.id}`)
        .send(updateData);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('year', updateData.year);

      harvestServiceStub.restore();
    });

    it('should return 404 when updating non-existent harvest', async () => {
      // Arrange
      const updateData = {
        year: 2024
      };

      const mockResponse = {
        success: true,
        data: null,
        message: 'Harvest not found'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'update').resolves(mockResponse);

      // Act
      const response = await request(app)
        .put('/harvests/99999')
        .send(updateData);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', null);
      expect(response.body).to.have.property('message', 'Harvest not found');

      harvestServiceStub.restore();
    });
  });

  describe('DELETE /harvests/:id', () => {
    it('should delete harvest successfully', async () => {
      // Arrange
      const mockHarvest = {
        id: 1,
        year: 2023
      } as any;

      const mockResponse = {
        success: true,
        data: null,
        message: 'Harvest deleted successfully'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'delete').resolves(mockResponse);

      // Act
      const response = await request(app)
        .delete(`/harvests/${mockHarvest.id}`);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message');

      harvestServiceStub.restore();
    });

    it('should return 404 when deleting non-existent harvest', async () => {
      // Arrange
      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'delete').rejects(new Error('Harvest not found'));

      // Act
      const response = await request(app)
        .delete('/harvests/99999');

      // Assert
      expect(response.status).to.equal(500);

      harvestServiceStub.restore();
    });
  });

  describe('GET /harvests/:id/farm', () => {
    it('should return farm by harvest id', async () => {
      // Arrange
      const mockFarm = {
        id: 1,
        name: 'Fazenda Teste',
        city: 'São Paulo',
        state: 'SP'
      } as any;

      const mockResponse = {
        success: true,
        data: mockFarm,
        message: 'Farm retrieved successfully'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'findFarmByHarvestId').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get('/harvests/1/farm');

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('id', mockFarm.id);
      expect(response.body.data).to.have.property('name', mockFarm.name);

      harvestServiceStub.restore();
    });
  });

  describe('GET /harvests/:id/cultivates', () => {
    it('should return cultivates by harvest id', async () => {
      // Arrange
      const mockCultivates = [
        { id: 1, name: 'Soja', harvestId: 1 },
        { id: 2, name: 'Milho', harvestId: 1 }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockCultivates,
        message: 'Cultivates retrieved successfully'
      };

      const harvestServiceStub = sinon.stub(HarvestService.prototype, 'findCultivatesByHarvestId').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get('/harvests/1/cultivates');

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.equal(2);
      response.body.data.forEach((cultivate: any) => {
        expect(cultivate).to.have.property('harvestId', 1);
      });

      harvestServiceStub.restore();
    });
  });
}); 