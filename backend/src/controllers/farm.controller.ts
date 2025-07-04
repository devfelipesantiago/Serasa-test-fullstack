import { Request, Response } from 'express';
import { FarmService } from "../services/farm.service";

/**
 * @swagger
 * tags:
 *   name: Farms
 *   description: Endpoints para fazendas
 *
 * /farms:
 *   get:
 *     summary: Lista todas as fazendas
 *     tags: [Farms]
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
 *   post:
 *     summary: Cria uma nova fazenda
 *     tags: [Farms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farm'
 *     responses:
 *       201:
 *         description: Fazenda criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *
 * /farms/{id}:
 *   get:
 *     summary: Busca uma fazenda pelo ID
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da fazenda
 *     responses:
 *       200:
 *         description: Fazenda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *   put:
 *     summary: Atualiza uma fazenda
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da fazenda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farm'
 *     responses:
 *       200:
 *         description: Fazenda atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *   delete:
 *     summary: Remove uma fazenda
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da fazenda
 *     responses:
 *       200:
 *         description: Fazenda removida
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
 * /farms/{id}/harvests:
 *   get:
 *     summary: Lista as safras de uma fazenda
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da fazenda
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
 * /farms/{id}/cultivates:
 *   get:
 *     summary: Lista os cultivos de uma fazenda
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da fazenda
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
 * /farms/{id}/producer:
 *   get:
 *     summary: Busca o produtor de uma fazenda
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da fazenda
 *     responses:
 *       200:
 *         description: Produtor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producer'
 *
 * /farms/state/{state}:
 *   get:
 *     summary: Lista fazendas por estado
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: Sigla do estado
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
 */

export class FarmController {
  constructor(private farmService: FarmService) { }

  async create(req: Request, res: Response) {
    const result = await this.farmService.createFarm(req.body);
    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response) {
    const result = await this.farmService.findAll();
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await this.farmService.findById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.farmService.update(Number(req.params.id), req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.farmService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getHarvestsByFarmId(req: Request, res: Response) {
    const result = await this.farmService.findHarvestsByFarmId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getCultivatesByFarmId(req: Request, res: Response) {
    const result = await this.farmService.findCultivatesByFarmId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getProducerByFarmId(req: Request, res: Response) {
    const result = await this.farmService.findProducerByFarmId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async findByState(req: Request, res: Response) {
    const result = await this.farmService.findByState(req.params.state);
    return res.status(200).json(result);
  }
}