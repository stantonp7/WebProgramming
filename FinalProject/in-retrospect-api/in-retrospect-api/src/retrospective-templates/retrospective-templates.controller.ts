import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RetrospectiveTemplateService } from './retrospective-templates.service';
import { RetrospectiveTemplate } from './retrospective-template.interface';

export class RetrospectiveTemplateController {
  public RetrospectiveTemplate = Container.get(RetrospectiveTemplateService);

  public getRetrospectiveTemplates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRetrospectiveTemplatesData: RetrospectiveTemplate[] = await this.RetrospectiveTemplate.findAllRetrospectiveTemplate();

      res.status(200).json({ data: findAllRetrospectiveTemplatesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRetrospectiveTemplateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RetrospectiveTemplateId: string = req.params.id;
      const findOneRetrospectiveTemplateData: RetrospectiveTemplate = await this.RetrospectiveTemplate.findRetrospectiveTemplateById(RetrospectiveTemplateId);

      res.status(200).json({ data: findOneRetrospectiveTemplateData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRetrospectiveTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RetrospectiveTemplateData: RetrospectiveTemplate = req.body;
      const createRetrospectiveTemplateData: RetrospectiveTemplate = await this.RetrospectiveTemplate.createRetrospectiveTemplate(RetrospectiveTemplateData);

      res.status(201).json({ data: createRetrospectiveTemplateData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRetrospectiveTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RetrospectiveTemplateId: string = req.params.id;
      const RetrospectiveTemplateData: RetrospectiveTemplate = req.body;
      const updateRetrospectiveTemplateData: RetrospectiveTemplate = await this.RetrospectiveTemplate.updateRetrospectiveTemplate(RetrospectiveTemplateId, RetrospectiveTemplateData);

      res.status(200).json({ data: updateRetrospectiveTemplateData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRetrospectiveTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RetrospectiveTemplateId: string = req.params.id;
      const deleteRetrospectiveTemplateData: RetrospectiveTemplate = await this.RetrospectiveTemplate.deleteRetrospectiveTemplate(RetrospectiveTemplateId);

      res.status(200).json({ data: deleteRetrospectiveTemplateData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
