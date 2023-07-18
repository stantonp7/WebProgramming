import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber} from 'class-validator';

export class CreateRetrospectiveDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  public name: string;

  @IsString()
  @IsNotEmpty()
  public templateID: string;
}

export class UpdateRetrospectiveDTO {
  @IsString()
  public name: string;

  @IsNumber()
  public position: number;
}

export class AddCommentDTO {
  @IsString()
  public comment: string;
}

export class AddResponse {
  @IsString()
  @IsNotEmpty()
  public response: string;

  @IsString()
  @IsNotEmpty()
  public columnName: string;
}

export class EditResponse {
  @IsString()
  public response: string;
  
}