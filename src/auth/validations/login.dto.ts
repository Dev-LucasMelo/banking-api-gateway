import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, Length, IsEmail } from "class-validator"

export class loginDto {

    @ApiProperty({
        description: 'email',
        example: 'teste@gmail.com',
    })

    @IsDefined({ message: "O campo e-mail é obrigatório" })
    @IsNotEmpty({ message: "O campo e-mail não pode ser vazio" })
    @IsEmail({}, { message: 'O campo e-mail informado é inválido.' })
    email: string

    @ApiProperty({
        description: 'password',
        example: '12345678',
    })

    @Length(8, 10, { message: "O campo password deve conter entre 8 e 10 caracteres" })
    @IsDefined({ message: "O campo password é obrigatório" })
    @IsNotEmpty({ message: "O campo password não pode ser vazio" })
    password: string
}

export class loginResponseDto {
    @ApiProperty({
        description: 'Token de autenticação JWT',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxZTEyM2ZkLTU0YWUtNDM2NS1hODNmLTNhNWMzZjZhOWNkMyIsImVtYWlsIjoibHVjYXNAZ21haWwuY29tIiwibm9tZV9jbGllYW50ZSI6ImNsaWVudGUgMiIsImlhdCI6MTc1NDAwNDMzNCwiZXhwIjoxNzU0MDA3OTM0fQ.cY_GkGN1GiNu6WgEBqBddNfsCSlIo13UDt5FT56wn8I',
    })

    token: string
}