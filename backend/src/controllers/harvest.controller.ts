import { Request, Response } from 'express';
import { HarvestService } from "../services/harvest.service";

/**
 * @swagger
 * tags:
 *   name: Harvests
 *   description: Endpoints para safras
 *
 * /harvests:
 *   get:
 *     summary: Lista todas as safras
 *     tags: [Harvests]
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
 *   post:
 *     summary: Cria uma nova safra
 *     tags: [Harvests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Harvest'
 *     responses:
 *       201:
 *         description: Safra criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Harvest'
 *
 * /harvests/{id}:
 *   get:
 *     summary: Busca uma safra pelo ID
 *     tags: [Harvests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da safra
 *     responses:
 *       200:
 *         description: Safra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Harvest'
 *   put:
 *     summary: Atualiza uma safra
 *     tags: [Harvests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da safra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Harvest'
 *     responses:
 *       200:
 *         description: Safra atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Harvest'
 *   delete:
 *     summary: Remove uma safra
 *     tags: [Harvests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da safra
 *     responses:
 *       200:
 *         description: Safra removida
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
 * /harvests/{id}/farm:
 *   get:
 *     summary: Busca a fazenda de uma safra
 *     tags: [Harvests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da safra
 *     responses:
 *       200:
 *         description: Fazenda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *
 * /harvests/{id}/cultivates:
 *   get:
 *     summary: Lista os cultivos de uma safra
 *     tags: [Harvests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da safra
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
 */
export class HarvestController {
  constructor(private harvestService: HarvestService) { }

  async create(req: Request, res: Response) {
    const result = await this.harvestService.createHarvest(req.body);
    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await this.harvestService.findAll(page, limit);
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await this.harvestService.findById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.harvestService.update(Number(req.params.id), req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.harvestService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getFarmByHarvestId(req: Request, res: Response) {
    const result = await this.harvestService.findFarmByHarvestId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getCultivatesByHarvestId(req: Request, res: Response) {
    const result = await this.harvestService.findCultivatesByHarvestId(Number(req.params.id));
    return res.status(200).json(result);
  }
}