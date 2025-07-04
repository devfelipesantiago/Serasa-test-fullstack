import { Request, Response } from 'express';
import { CultivateService } from "../services/cultivate.service";

/**
 * @swagger
 * tags:
 *   name: Cultivates
 *   description: Endpoints para cultivos
 *
 * /cultivates:
 *   get:
 *     summary: Lista todos os cultivos
 *     tags: [Cultivates]
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
 *   post:
 *     summary: Cria um novo cultivo
 *     tags: [Cultivates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cultivate'
 *     responses:
 *       201:
 *         description: Cultivo criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cultivate'
 *
 * /cultivates/{id}:
 *   get:
 *     summary: Busca um cultivo pelo ID
 *     tags: [Cultivates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cultivo
 *     responses:
 *       200:
 *         description: Cultivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cultivate'
 *   put:
 *     summary: Atualiza um cultivo
 *     tags: [Cultivates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cultivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cultivate'
 *     responses:
 *       200:
 *         description: Cultivo atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cultivate'
 *   delete:
 *     summary: Remove um cultivo
 *     tags: [Cultivates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cultivo
 *     responses:
 *       200:
 *         description: Cultivo removido
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
 * /cultivates/farm/{farmId}:
 *   get:
 *     summary: Lista cultivos por fazenda
 *     tags: [Cultivates]
 *     parameters:
 *       - in: path
 *         name: farmId
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
 * /cultivates/{id}/harvests:
 *   get:
 *     summary: Busca cultivo com safra e fazenda
 *     tags: [Cultivates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cultivo
 *     responses:
 *       200:
 *         description: Cultivo com safra e fazenda
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cultivate'
 */

export class CultivateController {
  constructor(private cultivateService: CultivateService) { }

  async create(req: Request, res: Response) {
    const result = await this.cultivateService.createCultivate(req.body);
    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response) {
    const result = await this.cultivateService.findAll();
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await this.cultivateService.findById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.cultivateService.update(Number(req.params.id), req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.cultivateService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getByIdHarvestAndFarm(req: Request, res: Response) {
    const result = await this.cultivateService.listByIdHarvestAndFarm(Number(req.params.id));
    return res.status(200).json(result);
  }

  async listByFarmId(req: Request, res: Response) {
    const result = await this.cultivateService.listByFarmId(Number(req.params.farmId));
    return res.status(200).json(result);
  }
}