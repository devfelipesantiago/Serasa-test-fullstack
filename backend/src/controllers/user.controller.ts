import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserRole } from '../model/entities/user.entity';
import { UserResponseDto } from '../dtos/user.dto';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gerenciamento de usuários
 */
export class UserController {
  constructor(private userService: UserService) { }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserDto'
   *     responses:
   *       201:
   *         description: Usuário criado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  async create(req: Request, res: Response) {
    const result = await this.userService.create(req.body);
    const { password, ...userWithoutPassword } = result;
    return res.status(201).json(userWithoutPassword);
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Lista todos os usuários
   *     tags: [Users]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: false
   *         description: Página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         required: false
   *         description: Limite de itens por página
   *       - in: query
   *         name: role
   *         schema:
   *           type: string
   *           enum: [CLIENT, PARTNER, ADMIN]
   *         required: false
   *         description: Filtrar por papel
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   *                 total:
   *                   type: integer
   */
  async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    let role: UserRole | undefined = undefined;
    if (typeof req.query.role === 'string' && ['CLIENT', 'PARTNER', 'ADMIN'].includes(req.query.role)) {
      role = req.query.role as UserRole;
    }
    const result = await this.userService.findAll(page, limit, role);

    const usersWithoutPassword = result.data.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return res.status(200).json({
      ...result,
      data: usersWithoutPassword
    });
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Busca um usuário pelo ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  async findById(req: Request, res: Response) {
    const result = await this.userService.findById(Number(req.params.id));
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = result;
    return res.status(200).json(userWithoutPassword);
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Atualiza um usuário
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserDto'
   *     responses:
   *       200:
   *         description: Usuário atualizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  async update(req: Request, res: Response) {
    const result = await this.userService.update(Number(req.params.id), req.body);
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = result;
    return res.status(200).json(userWithoutPassword);
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Remove um usuário
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário removido
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   */
  async delete(req: Request, res: Response) {
    const result = await this.userService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }
}
