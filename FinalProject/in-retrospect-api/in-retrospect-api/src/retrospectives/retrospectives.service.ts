import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Retrospective } from '@/retrospectives/retrospective.interface';
import { RetrospectiveModel } from '@/retrospectives/models/retrospective.model';

@Service()
export class RetrospectiveService {
  public async findAllRetrospective(): Promise<Retrospective[]> {
    const Retrospectives: Retrospective[] = await RetrospectiveModel.find();
    return Retrospectives;
  }

  public async findRetrospectiveById(RetrospectiveId: string): Promise<Retrospective> {
    const findRetrospective: Retrospective = await RetrospectiveModel.findOne({ _id: RetrospectiveId });
    if (!findRetrospective) throw new HttpException(409, "Retrospective doesn't exist");

    return findRetrospective;
  }

  public async createRetrospective(RetrospectiveData: Retrospective): Promise<Retrospective> {
    const findRetrospective: Retrospective = await RetrospectiveModel.findOne({ name: RetrospectiveData.name });
    if (findRetrospective) throw new HttpException(409, `This retrospective ${RetrospectiveData.name} already exists`);

    const createRetrospectiveData: Retrospective = await RetrospectiveModel.create({ ...RetrospectiveData });

    return createRetrospectiveData;
  }

  public async updateRetrospective(RetrospectiveId: string, RetrospectiveData: Retrospective): Promise<Retrospective> {
    if (RetrospectiveData.name) {
      const findRetrospective: Retrospective = await RetrospectiveModel.findOne({ name: RetrospectiveData.name });
      if (findRetrospective && findRetrospective._id != RetrospectiveId) throw new HttpException(409, `This name ${RetrospectiveData.name} already exists`);
    }

    const updateRetrospectiveById: Retrospective = await RetrospectiveModel.findByIdAndUpdate(RetrospectiveId,  RetrospectiveData );
    if (!updateRetrospectiveById) throw new HttpException(409, "Retrospective doesn't exist");

    return updateRetrospectiveById;
  }

  public async deleteRetrospective(RetrospectiveId: string): Promise<Retrospective> {
    const deleteRetrospectiveById: Retrospective = await RetrospectiveModel.findByIdAndDelete(RetrospectiveId);
    if (!deleteRetrospectiveById) throw new HttpException(409, "Retrospective doesn't exist");

    return deleteRetrospectiveById;
  }
}
