import { Router } from 'express';
import { CreateRetrospectiveDTO, UpdateRetrospectiveDTO } from '@/retrospectives/models/retrospective.dto';
import { Routes } from '@/utils/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { RetrospectiveController } from './retrospective-templates.controller';

export class RetrospectiveTemplateRoute implements Routes {
  public path = '/Retrospective-Templates';
  public router = Router();
  public Retrospective = new RetrospectiveController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.Retrospective.getRetrospectives);
    this.router.get(`${this.path}/:id`, this.Retrospective.getRetrospectiveById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRetrospectiveDTO, true), this.Retrospective.createRetrospective);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateRetrospectiveDTO, true), this.Retrospective.updateRetrospective);
    this.router.delete(`${this.path}/:id`, this.Retrospective.deleteRetrospective);
  }
}
