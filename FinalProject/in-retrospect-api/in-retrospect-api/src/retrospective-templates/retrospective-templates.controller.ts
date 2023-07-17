import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Retrospective } from '@/retrospectives/retrospective.interface';
import { RetrospectiveService } from './retrospective-templates.service';

export class RetrospectiveController {
  public Retrospective = Container.get(RetrospectiveService);

  public getRetrospectives = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRetrospectivesData: Retrospective[] = await this.Retrospective.findAllRetrospective();

      res.status(200).json({ data: findAllRetrospectivesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRetrospectiveById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RetrospectiveId: string = req.params.id;
      const findOneRetrospectiveData: Retrospective = await this.Retrospective.findRetrospectiveById(RetrospectiveId);

      res.status(200).json({ data: findOneRetrospectiveData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRetrospective = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RetrospectiveData: Retrospective = req.body;
      const createRetrospectiveData: Retrospective = await this.Retrospective.createRetrospective(RetrospectiveData);

      res.status(201).json({ data: createRetrospectiveData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRetrospective = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RetrospectiveId: string = req.params.id;
      const RetrospectiveData: Retrospective = req.body;
      const updateRetrospectiveData: Retrospective = await this.Retrospective.updateRetrospective(RetrospectiveId, RetrospectiveData);

      res.status(200).json({ data: updateRetrospectiveData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRetrospective = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RetrospectiveId: string = req.params.id;
      const deleteRetrospectiveData: Retrospective = await this.Retrospective.deleteRetrospective(RetrospectiveId);

      res.status(200).json({ data: deleteRetrospectiveData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
