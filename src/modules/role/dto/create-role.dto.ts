import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUppercase } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty({
    description: 'Nome da role (grupo ou papel) do usuário',
    example: 'ADMIN',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  name: string;

  @ApiProperty({
    description: 'Descrição da role',
    example: 'Administrador do sistema',
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
