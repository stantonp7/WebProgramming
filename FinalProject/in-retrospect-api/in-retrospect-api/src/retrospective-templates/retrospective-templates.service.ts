import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { RetrospectiveTemplate } from './retrospective-template.interface';
import { RetrospectiveTemplateModel } from './models/retrospective-template.model';
const uuid = require('uuid');

@Service()
export class RetrospectiveTemplateService {
  public async findAllRetrospectiveTemplate(): Promise<RetrospectiveTemplate[]> {
    const RetrospectiveTemplates: RetrospectiveTemplate[] = await RetrospectiveTemplateModel.find();
    return RetrospectiveTemplates;
  }

  public async findRetrospectiveTemplateById(RetrospectiveTemplateId: string): Promise<RetrospectiveTemplate> {
    const findRetrospectiveTemplate: RetrospectiveTemplate = await RetrospectiveTemplateModel.findOne({ _id: RetrospectiveTemplateId });
    if (!findRetrospectiveTemplate) throw new HttpException(409, "RetrospectiveTemplate doesn't exist");

    return findRetrospectiveTemplate;
  }

  public async createRetrospectiveTemplate(RetrospectiveTemplateData: RetrospectiveTemplate): Promise<RetrospectiveTemplate> {
    const findRetrospectiveTemplate: RetrospectiveTemplate = await RetrospectiveTemplateModel.findOne({ name: RetrospectiveTemplateData.name });
    if (findRetrospectiveTemplate) throw new HttpException(409, `This template ${RetrospectiveTemplateData.name} already exists`);
    const createRetrospectiveTemplateData: RetrospectiveTemplate = await RetrospectiveTemplateModel.create({ ...RetrospectiveTemplateData});

    return createRetrospectiveTemplateData;
  }

  public async updateRetrospectiveTemplate(RetrospectiveTemplateId: string, RetrospectiveTemplateData: RetrospectiveTemplate): Promise<RetrospectiveTemplate> {
    console.log(RetrospectiveTemplateData);
    if (RetrospectiveTemplateData.name) {
      const findRetrospectiveTemplate: RetrospectiveTemplate = await RetrospectiveTemplateModel.findOne({ name: RetrospectiveTemplateData.name });
      if (findRetrospectiveTemplate && findRetrospectiveTemplate._id != RetrospectiveTemplateId) throw new HttpException(409, `This template ${RetrospectiveTemplateData.name} already exists`);
    }

    const updateRetrospectiveTemplateById: RetrospectiveTemplate = await RetrospectiveTemplateModel.findByIdAndUpdate(RetrospectiveTemplateId, RetrospectiveTemplateData, {new: true} );
    if (!updateRetrospectiveTemplateById) throw new HttpException(409, "RetrospectiveTemplate doesn't exist");

    return updateRetrospectiveTemplateById;
  }

  public async deleteRetrospectiveTemplate(RetrospectiveTemplateId: string): Promise<RetrospectiveTemplate> {
    const deleteRetrospectiveTemplateById: RetrospectiveTemplate = await RetrospectiveTemplateModel.findByIdAndDelete(RetrospectiveTemplateId);
    if (!deleteRetrospectiveTemplateById) throw new HttpException(409, "RetrospectiveTemplate doesn't exist");

    return deleteRetrospectiveTemplateById;
  }
}
