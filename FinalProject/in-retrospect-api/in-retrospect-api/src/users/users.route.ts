import { Router } from 'express';
import { CreateUserDto } from '@/users/models/users.dto';
import { Routes } from '@/utils/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { UserController } from './users.controller';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto, true), this.user.createUser);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateUserDto, true), this.user.updateUser);
    this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}
