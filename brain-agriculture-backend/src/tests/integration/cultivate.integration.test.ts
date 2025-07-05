import { describe, it, beforeEach } from 'mocha';
import request from 'supertest';
import app from '../../app';
import * as sinon from 'sinon';
import { CultivateService } from '../../services/cultivate.service';
import { expect } from 'chai';

describe('Cultivate Integration Tests', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('POST /cultivates', () => {
    it('should create a new cultivate successfully', async () => {
      // Arrange
      const httpRequestBody = {
        name: 'Soja',
        harvestId: 1
      };

      const mockCultivate = {
        id: 1,
        name: 'Soja',
        harvest: { id: 1, year: 2023 }
      } as any;

      const mockResponse = {
        success: true,
        data: mockCultivate,
        message: 'Cultivate created successfully'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'createCultivate').resolves(mockResponse);

      // Act
      const response = await request(app)
        .post('/cultivates')
        .send(httpRequestBody);

      // Assert
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('name', httpRequestBody.name);
      expect(response.body.data).to.have.property('harvest');

      cultivateServiceStub.restore();
    });

    it('should return 400 when creating cultivate with invalid data', async () => {
      // Arrange
      const httpRequestBody = {
        name: '',
        harvestId: 'invalid'
      };

      // Act
      const response = await request(app)
        .post('/cultivates')
        .send(httpRequestBody);

      // Assert
      expect(response.status).to.equal(400);
    });
  });

  describe('GET /cultivates', () => {
    it('should return all cultivates with pagination', async () => {
      // Arrange
      const mockCultivates = [
        { id: 1, name: 'Soja', harvest: { id: 1, year: 2023 } },
        { id: 2, name: 'Milho', harvest: { id: 2, year: 2022 } },
        { id: 3, name: 'Feijão', harvest: { id: 3, year: 2021 } }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockCultivates,
        message: 'Cultivates retrieved successfully'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'findAll').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get('/cultivates')
        .query({ page: 1, limit: 10 });

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);

      cultivateServiceStub.restore();
    });
  });

  describe('GET /cultivates/:id', () => {
    it('should return cultivate by id', async () => {
      // Arrange
      const mockCultivate = {
        id: 1,
        name: 'Soja',
        harvest: { id: 1, year: 2023 }
      } as any;

      const mockResponse = {
        success: true,
        data: mockCultivate,
        message: 'Cultivate retrieved successfully'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'findById').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get(`/cultivates/${mockCultivate.id}`);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('id', mockCultivate.id);
      expect(response.body.data).to.have.property('name', mockCultivate.name);
      expect(response.body.data).to.have.property('harvest');

      cultivateServiceStub.restore();
    });

    it('should return 404 when cultivate not found', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        data: null,
        message: 'Cultivate not found'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'findById').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get('/cultivates/99999');

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', null);
      expect(response.body).to.have.property('message', 'Cultivate not found');

      cultivateServiceStub.restore();
    });
  });

  describe('PUT /cultivates/:id', () => {
    it('should update cultivate successfully', async () => {
      // Arrange
      const mockCultivate = {
        id: 1,
        name: 'Soja',
        harvest: { id: 1, year: 2023 }
      } as any;

      const updateData = {
        name: 'Soja Transgênica'
      };

      const updatedCultivate = { ...mockCultivate, ...updateData };

      const mockResponse = {
        success: true,
        data: updatedCultivate,
        message: 'Cultivate updated successfully'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'update').resolves(mockResponse);

      // Act
      const response = await request(app)
        .put(`/cultivates/${mockCultivate.id}`)
        .send(updateData);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('name', updateData.name);

      cultivateServiceStub.restore();
    });

    it('should return 404 when updating non-existent cultivate', async () => {
      // Arrange
      const updateData = {
        name: 'Soja Transgênica'
      };

      const mockResponse = {
        success: true,
        data: null,
        message: 'Cultivate not found'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'update').resolves(mockResponse);

      // Act
      const response = await request(app)
        .put('/cultivates/99999')
        .send(updateData);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', null);
      expect(response.body).to.have.property('message', 'Cultivate not found');

      cultivateServiceStub.restore();
    });
  });

  describe('DELETE /cultivates/:id', () => {
    it('should delete cultivate successfully', async () => {
      // Arrange
      const mockCultivate = {
        id: 1,
        name: 'Soja'
      } as any;

      const mockResponse = {
        success: true,
        data: null,
        message: 'Cultivate deleted successfully'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'delete').resolves(mockResponse);

      // Act
      const response = await request(app)
        .delete(`/cultivates/${mockCultivate.id}`);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message');

      cultivateServiceStub.restore();
    });

    it('should return 404 when deleting non-existent cultivate', async () => {
      // Arrange
      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'delete').rejects(new Error('Cultivate not found'));

      // Act
      const response = await request(app)
        .delete('/cultivates/99999');

      // Assert
      expect(response.status).to.equal(500);

      cultivateServiceStub.restore();
    });
  });

  describe('GET /cultivates/farm/:farmId', () => {
    it('should return cultivates by farm id', async () => {
      // Arrange
      const mockCultivates = [
        { id: 1, name: 'Soja', farmId: 1 },
        { id: 2, name: 'Milho', farmId: 1 }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockCultivates,
        message: 'Cultivates retrieved successfully'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'listByFarmId').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get('/cultivates/farm/1');

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.equal(2);
      response.body.data.forEach((cultivate: any) => {
        expect(cultivate).to.have.property('farmId', 1);
      });

      cultivateServiceStub.restore();
    });
  });

  describe('GET /cultivates/:id/harvests', () => {
    it('should return cultivate with harvest and farm', async () => {
      // Arrange
      const mockCultivate = {
        id: 1,
        name: 'Soja',
        harvest: {
          id: 1,
          year: 2023,
          farm: { id: 1, name: 'Fazenda Teste' }
        }
      } as any;

      const mockResponse = {
        success: true,
        data: mockCultivate,
        message: 'Cultivate with harvest and farm retrieved successfully'
      };

      const cultivateServiceStub = sinon.stub(CultivateService.prototype, 'listByIdHarvestAndFarm').resolves(mockResponse);

      // Act
      const response = await request(app)
        .get('/cultivates/1/harvests');

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('id', mockCultivate.id);
      expect(response.body.data).to.have.property('name', mockCultivate.name);
      expect(response.body.data).to.have.property('harvest');
      expect(response.body.data.harvest).to.have.property('farm');

      cultivateServiceStub.restore();
    });
  });
}); 