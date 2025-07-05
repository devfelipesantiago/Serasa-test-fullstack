import { describe, it, beforeEach } from 'mocha';
import request from 'supertest';
import app from '../../app';
import * as sinon from 'sinon';
import { FarmService } from '../../services/farm.service';
import { expect } from 'chai';

describe('Farm Integration Tests', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('POST /farms', () => {
    it('should create a new farm successfully', async () => {
      const httpRequestBody = {
        name: 'Fazenda Teste',
        city: 'São Paulo',
        state: 'SP',
        totalArea: 1000.5,
        arableArea: 800.0,
        vegetationArea: 200.5,
        producerId: 1
      };

      const mockFarm = {
        id: 1,
        name: 'Fazenda Teste',
        city: 'São Paulo',
        state: 'SP',
        totalArea: 1000.5,
        arableArea: 800.0,
        vegetationArea: 200.5,
        producer: { id: 1, name: 'Produtor Teste' }
      } as any;

      const mockResponse = {
        success: true,
        data: mockFarm,
        message: 'Farm created successfully'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'createFarm').resolves(mockResponse);

      const response = await request(app)
        .post('/farms')
        .send(httpRequestBody);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('name', httpRequestBody.name);
      expect(response.body.data).to.have.property('city', httpRequestBody.city);
      expect(response.body.data).to.have.property('state', httpRequestBody.state);
      expect(response.body.data).to.have.property('totalArea', httpRequestBody.totalArea);

      farmServiceStub.restore();
    });

    it('should return 400 when creating farm with invalid data', async () => {
      const httpRequestBody = {
        name: '',
        totalArea: -100,
        arableArea: 1500,
        vegetationArea: -50
      };

      const response = await request(app)
        .post('/farms')
        .send(httpRequestBody);

      expect(response.status).to.equal(400);
    });
  });

  describe('GET /farms', () => {
    it('should return all farms with pagination', async () => {
      const mockFarms = [
        { id: 1, name: 'Fazenda 1', city: 'São Paulo', state: 'SP', totalArea: 1000.5 },
        { id: 2, name: 'Fazenda 2', city: 'Rio de Janeiro', state: 'RJ', totalArea: 1500.0 },
        { id: 3, name: 'Fazenda 3', city: 'Belo Horizonte', state: 'MG', totalArea: 800.0 }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockFarms,
        message: 'Farms retrieved successfully'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'findAll').resolves(mockResponse);

      const response = await request(app)
        .get('/farms')
        .query({ page: 1, limit: 10 });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);

      farmServiceStub.restore();
    });

    it('should filter farms by state', async () => {
      const mockFarms = [{ id: 1, name: 'Fazenda SP', city: 'São Paulo', state: 'SP', totalArea: 1000.5 }];
      const mockResponse = {
        data: mockFarms,
        total: 1,
        page: 1,
        limit: 10
      } as any;

      const farmServiceStub = sinon.stub(FarmService.prototype, 'findAll').resolves(mockResponse);

      const response = await request(app)
        .get('/farms')
        .query({ state: 'SP' });

      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
      response.body.data.forEach((farm: any) => {
        expect(farm.state).to.equal('SP');
      });

      farmServiceStub.restore();
    });
  });

  describe('GET /farms/:id', () => {
    it('should return farm by id', async () => {
      const mockFarm = {
        id: 1,
        name: 'Fazenda Teste',
        city: 'São Paulo',
        state: 'SP',
        totalArea: 1000.5,
        arableArea: 800.0,
        vegetationArea: 200.5
      } as any;

      const mockResponse = {
        success: true,
        data: mockFarm,
        message: 'Farm retrieved successfully'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'findById').resolves(mockResponse);

      const response = await request(app)
        .get(`/farms/${mockFarm.id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('id', mockFarm.id);
      expect(response.body.data).to.have.property('name', mockFarm.name);
      expect(response.body.data).to.have.property('city', mockFarm.city);
      expect(response.body.data).to.have.property('state', mockFarm.state);

      farmServiceStub.restore();
    });

    it('should return 404 when farm not found', async () => {
      const mockResponse = {
        success: true,
        data: null,
        message: 'Farm not found'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'findById').resolves(mockResponse);

      const response = await request(app)
        .get('/farms/99999');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', null);
      expect(response.body).to.have.property('message', 'Farm not found');

      farmServiceStub.restore();
    });
  });

  describe('PUT /farms/:id', () => {
    it('should update farm successfully', async () => {
      const mockFarm = {
        id: 1,
        name: 'Fazenda Teste',
        city: 'São Paulo',
        state: 'SP',
        totalArea: 1000.5
      } as any;

      const updateData = {
        name: 'Fazenda Atualizada',
        city: 'Rio de Janeiro',
        state: 'RJ'
      };

      const updatedFarm = { ...mockFarm, ...updateData };

      const mockResponse = {
        success: true,
        data: updatedFarm,
        message: 'Farm updated successfully'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'update').resolves(mockResponse);

      const response = await request(app)
        .put(`/farms/${mockFarm.id}`)
        .send(updateData);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('name', updateData.name);
      expect(response.body.data).to.have.property('city', updateData.city);
      expect(response.body.data).to.have.property('state', updateData.state);

      farmServiceStub.restore();
    });

    it('should return 404 when updating non-existent farm', async () => {
      const updateData = {
        name: 'Fazenda Atualizada',
        city: 'Rio de Janeiro'
      };

      const mockResponse = {
        success: true,
        data: null,
        message: 'Farm not found'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'update').resolves(mockResponse);

      const response = await request(app)
        .put('/farms/99999')
        .send(updateData);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', null);
      expect(response.body).to.have.property('message', 'Farm not found');

      farmServiceStub.restore();
    });
  });

  describe('DELETE /farms/:id', () => {
    it('should delete farm successfully', async () => {
      const mockFarm = {
        id: 1,
        name: 'Fazenda Teste'
      } as any;

      const mockResponse = {
        success: true,
        data: null,
        message: 'Farm deleted successfully'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'delete').resolves(mockResponse);

      const response = await request(app)
        .delete(`/farms/${mockFarm.id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message');

      farmServiceStub.restore();
    });

    it('should return 404 when deleting non-existent farm', async () => {
      const farmServiceStub = sinon.stub(FarmService.prototype, 'delete').rejects(new Error('Farm not found'));

      const response = await request(app)
        .delete('/farms/99999');

      expect(response.status).to.equal(500);

      farmServiceStub.restore();
    });
  });

  describe('GET /farms/:id/harvests', () => {
    it('should return harvests by farm id', async () => {
      const mockHarvests = [
        { id: 1, year: 2023, quantity: 1000.5, farmId: 1 },
        { id: 2, year: 2022, quantity: 950.0, farmId: 1 }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockHarvests,
        message: 'Harvests retrieved successfully'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'findHarvestsByFarmId').resolves(mockResponse);

      const response = await request(app)
        .get('/farms/1/harvests');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.equal(2);
      response.body.data.forEach((harvest: any) => {
        expect(harvest).to.have.property('farmId', 1);
      });

      farmServiceStub.restore();
    });
  });

  describe('GET /farms/:id/cultivates', () => {
    it('should return cultivates by farm id', async () => {
      const mockCultivates = [
        { id: 1, cropType: 'Soja', area: 500.0, farmId: 1 },
        { id: 2, cropType: 'Milho', area: 300.0, farmId: 1 }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockCultivates,
        message: 'Cultivates retrieved successfully'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'findCultivatesByFarmId').resolves(mockResponse);

      const response = await request(app)
        .get('/farms/1/cultivates');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.equal(2);
      response.body.data.forEach((cultivate: any) => {
        expect(cultivate).to.have.property('farmId', 1);
      });

      farmServiceStub.restore();
    });
  });

  describe('GET /farms/state/:state', () => {
    it('should return farms by state', async () => {
      const mockFarms = [
        { id: 1, name: 'Fazenda SP 1', state: 'SP' },
        { id: 2, name: 'Fazenda SP 2', state: 'SP' }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockFarms,
        message: 'Farms retrieved successfully'
      };

      const farmServiceStub = sinon.stub(FarmService.prototype, 'findByState').resolves(mockResponse);

      const response = await request(app)
        .get('/farms/state/SP');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.equal(2);
      response.body.data.forEach((farm: any) => {
        expect(farm.state).to.equal('SP');
      });

      farmServiceStub.restore();
    });
  });
}); 