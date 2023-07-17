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
    const findRetrospective: Retrospective = await RetrospectiveModel.findOne({ email: RetrospectiveData.email });
    if (findRetrospective) throw new HttpException(409, `This email ${RetrospectiveData.email} already exists`);

    const hashedPassword = await hash(RetrospectiveData.password, 10);
    const createRetrospectiveData: Retrospective = await RetrospectiveModel.create({ ...RetrospectiveData, password: hashedPassword });

    return createRetrospectiveData;
  }

  public async updateRetrospective(RetrospectiveId: string, RetrospectiveData: Retrospective): Promise<Retrospective> {
    if (RetrospectiveData.email) {
      const findRetrospective: Retrospective = await RetrospectiveModel.findOne({ email: RetrospectiveData.email });
      if (findRetrospective && findRetrospective._id != RetrospectiveId) throw new HttpException(409, `This email ${RetrospectiveData.email} already exists`);
    }

    if (RetrospectiveData.password) {
      const hashedPassword = await hash(RetrospectiveData.password, 10);
      RetrospectiveData = { ...RetrospectiveData, password: hashedPassword };
    }

    const updateRetrospectiveById: Retrospective = await RetrospectiveModel.findByIdAndUpdate(RetrospectiveId, { RetrospectiveData });
    if (!updateRetrospectiveById) throw new HttpException(409, "Retrospective doesn't exist");

    return updateRetrospectiveById;
  }

  public async deleteRetrospective(RetrospectiveId: string): Promise<Retrospective> {
    const deleteRetrospectiveById: Retrospective = await RetrospectiveModel.findByIdAndDelete(RetrospectiveId);
    if (!deleteRetrospectiveById) throw new HttpException(409, "Retrospective doesn't exist");

    return deleteRetrospectiveById;
  }
}
