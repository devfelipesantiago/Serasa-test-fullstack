import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { validateDto } from '../middlewares/validateDto.middleware';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

export const userRouter = (userService?: UserService) => {
  const router = Router();
  const service = userService || new UserService();
  const userController = new UserController(service);

  router.post('/', validateDto(CreateUserDto), asyncHandler((req: Request, res: Response) => userController.create(req, res)));
  router.get('/', asyncHandler((req: Request, res: Response) => userController.findAll(req, res)));
  router.get('/:id', asyncHandler((req: Request, res: Response) => userController.findById(req, res)));
  router.put('/:id', validateDto(UpdateUserDto), asyncHandler((req: Request, res: Response) => userController.update(req, res)));
  router.delete('/:id', asyncHandler((req: Request, res: Response) => userController.delete(req, res)));

  return router;
};
