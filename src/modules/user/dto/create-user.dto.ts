import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'E-mail de acesso',
    example: 'mail@mail.com.br',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha de acesso',
    example: 'abc102030',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Fulano',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'Sobrenome do usuário',
    example: 'Silva',
    type: String,
  })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty({
    description: 'Grupo do usuário',
    example: 'DEVELOPER',
    type: String,
  })
  @IsString()
  role: string;
}
