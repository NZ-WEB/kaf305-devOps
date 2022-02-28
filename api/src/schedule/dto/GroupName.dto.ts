import { IsNotEmpty } from 'class-validator';

export class GroupNameDto {
  @IsNotEmpty()
  readonly groupName: string;
}
