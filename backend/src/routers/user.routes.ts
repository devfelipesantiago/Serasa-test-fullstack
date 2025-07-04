import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userController = new UserController();

const userRoutes = Router();
userRoutes.use('/', userController.router);

export { userRoutes };
