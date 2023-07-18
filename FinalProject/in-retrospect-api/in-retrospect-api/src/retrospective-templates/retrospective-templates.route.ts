import { Router } from 'express';
import { CreateRetrospectiveDTO, UpdateRetrospectiveDTO } from '@/retrospectives/models/retrospective.dto';
import { Routes } from '@/utils/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { RetrospectiveTemplateController } from './retrospective-templates.controller';

export class RetrospectiveTemplateRoute implements Routes {
  public path = '/Retrospective-Templates';
  public router = Router();
  public Retrospective = new RetrospectiveTemplateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.Retrospective.getRetrospectiveTemplates);
    this.router.get(`${this.path}/:id`, this.Retrospective.getRetrospectiveTemplateById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRetrospectiveDTO, true), this.Retrospective.createRetrospectiveTemplate);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateRetrospectiveDTO, true), this.Retrospective.updateRetrospectiveTemplate);
    this.router.delete(`${this.path}/:id`, this.Retrospective.deleteRetrospectiveTemplate);
  }
}
