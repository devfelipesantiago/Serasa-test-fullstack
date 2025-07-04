import { Request, Response, Router } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { validateDto } from '../middlewares/validateDto.middleware';
import { ResponseHandler } from '../utils/responseHandler.utils';
import { UserRole } from '../model/entities/user.entity';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gerenciamento de usuários
 */
export class UserController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
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
     *         description: Usuário criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     */
    this.router.post('/', validateDto(CreateUserDto), this.create.bind(this));

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Lista usuários com paginação e filtro por role
     *     tags: [Users]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         description: Página
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         description: Limite por página
     *       - in: query
     *         name: role
     *         schema:
     *           type: string
     *           enum: [CLIENT, PARTNER, ADMIN]
     *         description: Filtrar por tipo de usuário
     *     responses:
     *       200:
     *         description: Lista de usuários
     */
    this.router.get('/', this.findAll.bind(this));

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Busca usuário por ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Usuário encontrado
     *       404:
     *         description: Usuário não encontrado
     */
    this.router.get('/:id', this.findById.bind(this));

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Atualiza usuário
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUserDto'
     *     responses:
     *       200:
     *         description: Usuário atualizado
     *       404:
     *         description: Usuário não encontrado
     */
    this.router.put('/:id', validateDto(UpdateUserDto), this.update.bind(this));

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Remove usuário
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Usuário removido
     *       404:
     *         description: Usuário não encontrado
     */
    this.router.delete('/:id', this.delete.bind(this));
  }

  async create(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body);
      ResponseHandler.success(res, user, 'User created successfully', 201);
    } catch (error: any) {
      ResponseHandler.error(res, error.message || 'Error creating user', 400);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, role } = req.query;
      const result = await this.userService.findAll(Number(page), Number(limit), role as UserRole);
      ResponseHandler.success(res, result, 'User list');
    } catch (error: any) {
      ResponseHandler.error(res, error.message || 'Error fetching users', 400);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const user = await this.userService.findById(Number(req.params.id));
      if (!user) return ResponseHandler.notFound(res, 'User not found');
      ResponseHandler.success(res, user, 'User found');
    } catch (error: any) {
      ResponseHandler.error(res, error.message || 'Error fetching user', 400);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await this.userService.update(Number(req.params.id), req.body);
      if (!user) return ResponseHandler.notFound(res, 'User not found');
      ResponseHandler.success(res, user, 'User updated');
    } catch (error: any) {
      ResponseHandler.error(res, error.message || 'Error updating user', 400);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.userService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      ResponseHandler.error(res, error.message || 'Error deleting user', 400);
    }
  }
}
