import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber} from 'class-validator';

export class CreateRetrospectiveTemplateDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  public name: string;
}

export class UpdateRetrospectiveTemplateDTO {
  @IsString()
  public name: string;

  @IsNumber()
  public position: number;
}