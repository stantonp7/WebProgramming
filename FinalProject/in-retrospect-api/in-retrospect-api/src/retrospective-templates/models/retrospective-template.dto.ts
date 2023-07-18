import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber} from 'class-validator';
import { RetrospectiveTemplateCol } from '../retrospective-template.interface';

export class CreateRetrospectiveTemplateDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  public name: string;

  public columns: Array<RetrospectiveTemplateCol>;
}

export class UpdateRetrospectiveTemplateDTO {
  @IsString()
  public name: string;

  public columns: Array<RetrospectiveTemplateCol>;
}

