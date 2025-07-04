import { Request, Response } from 'express';
import { ProducerService } from "../services/producer.service";

/**
 * @swagger
 * tags:
 *   name: Producers
 *   description: Endpoints para produtores
 */

/**
 * @swagger
 * /producers:
 *   get:
 *     summary: Lista todos os produtores
 *     tags: [Producers]
 *     responses:
 *       200:
 *         description: Lista de produtores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Producer'
 *                 message:
 *                   type: string
 *   post:
 *     summary: Cria um novo produtor
 *     tags: [Producers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               document:
 *                 type: string
 *                 example: 12345678900
 *     responses:
 *       201:
 *         description: Produtor criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producer'
 * /producers/{id}:
 *   get:
 *     summary: Busca um produtor pelo ID
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produtor
 *     responses:
 *       200:
 *         description: Produtor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producer'
 *   put:
 *     summary: Atualiza um produtor
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produtor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Novo Nome
 *               document:
 *                 type: string
 *                 example: 98765432100
 *     responses:
 *       200:
 *         description: Produtor atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producer'
 *   delete:
 *     summary: Remove um produtor
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produtor
 *     responses:
 *       200:
 *         description: Produtor removido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                 message:
 *                   type: string
 *
 * /producers/{id}/farms:
 *   get:
 *     summary: Lista as fazendas de um produtor
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produtor
 *     responses:
 *       200:
 *         description: Lista de fazendas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Farm'
 *                 message:
 *                   type: string
 *
 * /producers/{id}/harvests:
 *   get:
 *     summary: Lista as safras de um produtor
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produtor
 *     responses:
 *       200:
 *         description: Lista de safras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Harvest'
 *                 message:
 *                   type: string
 *
 * /producers/{id}/cultivates:
 *   get:
 *     summary: Lista os cultivos de um produtor
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produtor
 *     responses:
 *       200:
 *         description: Lista de cultivos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cultivate'
 *                 message:
 *                   type: string
 *
 * /producers/document/{document}:
 *   get:
 *     summary: Busca produtor por documento (CPF/CNPJ)
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: document
 *         schema:
 *           type: string
 *         required: true
 *         description: CPF ou CNPJ do produtor
 *     responses:
 *       200:
 *         description: Produtor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producer'
 */

export class ProducerController {
  constructor(private producerService: ProducerService) { }

  async create(req: Request, res: Response) {
    const result = await this.producerService.createProducer(req.body);
    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await this.producerService.findAll(page, limit);
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await this.producerService.findById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.producerService.update(Number(req.params.id), req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.producerService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getFarmsByProducerId(req: Request, res: Response) {
    const result = await this.producerService.findFarmsByProducerId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getHarvestsByProducerId(req: Request, res: Response) {
    const result = await this.producerService.findHarvestsByProducerId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getCultivatesByProducerId(req: Request, res: Response) {
    const result = await this.producerService.findCultivatesByProducerId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async findByDocument(req: Request, res: Response) {
    const result = await this.producerService.findByDocument(req.params.document);
    return res.status(200).json(result);
  }
}