import { describe, it, beforeEach } from 'mocha';
import request from 'supertest';
import app from '../../app';
import * as sinon from 'sinon';
import { ProducerService } from '../../services/producer.service';
import { expect } from 'chai';

describe('Producer Integration Tests', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('POST /producers', () => {
    it('should create a new producer successfully', async () => {

      const httpRequestBody = {
        name: 'Produtor Teste',
        document: '12345678901',
        documentType: 'CPF'
      };

      const mockProducer = {
        id: 1,
        name: 'Produtor Teste',
        document: '12345678901',
        documentType: 'CPF'
      } as any;

      const mockResponse = {
        success: true,
        data: mockProducer,
        message: 'Producer created successfully'
      };

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'createProducer').resolves(mockResponse);


      const response = await request(app)
        .post('/producers')
        .send(httpRequestBody);


      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('name', httpRequestBody.name);
      expect(response.body.data).to.have.property('document', httpRequestBody.document);
      expect(response.body.data).to.have.property('documentType', httpRequestBody.documentType);

      producerServiceStub.restore();
    });

    it('should return 400 when creating producer with invalid data', async () => {

      const httpRequestBody = {
        name: '',
        document: '123',
        documentType: 'INVALID'
      };


      const response = await request(app)
        .post('/producers')
        .send(httpRequestBody);

      expect(response.status).to.equal(400);
    });
  });

  describe('GET /producers', () => {
    it('should return all producers with pagination', async () => {

      const mockProducers = [
        { id: 1, name: 'Produtor 1', document: '12345678901', documentType: 'CPF' },
        { id: 2, name: 'Produtor 2', document: '98765432100', documentType: 'CPF' },
        { id: 3, name: 'Produtor 3', document: '12345678000199', documentType: 'CNPJ' }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockProducers,
        message: 'Producers retrieved successfully'
      };

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'findAll').resolves(mockResponse);

      const response = await request(app)
        .get('/producers')
        .query({ page: 1, limit: 10 });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);

      producerServiceStub.restore();
    });
  });

  describe('GET /producers/:id', () => {
    it('should return producer by id', async () => {

      const mockProducer = {
        id: 1,
        name: 'Produtor Teste',
        document: '12345678901',
        documentType: 'CPF'
      } as any;

      const mockResponse = {
        success: true,
        data: mockProducer,
        message: 'Producer retrieved successfully'
      };

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'findById').resolves(mockResponse);

      const response = await request(app)
        .get(`/producers/${mockProducer.id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('id', mockProducer.id);
      expect(response.body.data).to.have.property('name', mockProducer.name);
      expect(response.body.data).to.have.property('document', mockProducer.document);

      producerServiceStub.restore();
    });

    it('should return 404 when producer not found', async () => {

      const mockResponse = {
        success: true,
        data: null,
        message: 'Producer not found'
      };

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'findById').resolves(mockResponse);

      const response = await request(app)
        .get('/producers/99999');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', null);
      expect(response.body).to.have.property('message', 'Producer not found');

      producerServiceStub.restore();
    });
  });

  describe('PUT /producers/:id', () => {
    it('should update producer successfully', async () => {

      const mockProducer = {
        id: 1,
        name: 'Produtor Teste',
        document: '12345678901',
        documentType: 'CPF'
      } as any;

      const updateData = {
        name: 'Produtor Atualizado',
        document: '98765432100'
      };

      const updatedProducer = { ...mockProducer, ...updateData };

      const mockResponse = {
        success: true,
        data: updatedProducer,
        message: 'Producer updated successfully'
      };

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'update').resolves(mockResponse);

      const response = await request(app)
        .put(`/producers/${mockProducer.id}`)
        .send(updateData);


      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('name', updateData.name);
      expect(response.body.data).to.have.property('document', updateData.document);

      producerServiceStub.restore();
    });

    it('should return 404 when updating non-existent producer', async () => {

      const updateData = {
        name: 'Produtor Atualizado',
        document: '98765432100'
      };

      const mockResponse = {
        success: true,
        data: null,
        message: 'Producer not found'
      };

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'update').resolves(mockResponse);

      const response = await request(app)
        .put('/producers/99999')
        .send(updateData);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', null);
      expect(response.body).to.have.property('message', 'Producer not found');

      producerServiceStub.restore();
    });
  });

  describe('DELETE /producers/:id', () => {
    it('should delete producer successfully', async () => {

      const mockProducer = {
        id: 1,
        name: 'Produtor Teste'
      } as any;

      const mockResponse = {
        success: true,
        data: null,
        message: 'Producer deleted successfully'
      };

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'delete').resolves(mockResponse);

      const response = await request(app)
        .delete(`/producers/${mockProducer.id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message');

      producerServiceStub.restore();
    });

    it('should return 404 when deleting non-existent producer', async () => {

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'delete').rejects(new Error('Producer not found'));

      const response = await request(app)
        .delete('/producers/99999');

      expect(response.status).to.equal(500);

      producerServiceStub.restore();
    });
  });

  describe('GET /producers/:id/farms', () => {
    it('should return farms by producer id', async () => {

      const mockFarms = [
        { id: 1, name: 'Fazenda 1', producerId: 1 },
        { id: 2, name: 'Fazenda 2', producerId: 1 }
      ] as any[];

      const mockResponse = {
        success: true,
        data: mockFarms,
        message: 'Farms retrieved successfully'
      };

      const producerServiceStub = sinon.stub(ProducerService.prototype, 'findFarmsByProducerId').resolves(mockResponse);

      const response = await request(app)
        .get('/producers/1/farms');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.equal(2);
      response.body.data.forEach((farm: any) => {
        expect(farm).to.have.property('producerId', 1);
      });

      producerServiceStub.restore();
    });
  });
}); 