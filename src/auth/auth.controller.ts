import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, loginResponseDto } from './validations/login.dto';
import { JWTguard } from './jwt.guard';
import { clientLoggedIn } from './decorators/clientLoggedIn.decorator';
import { registerDto, registerResponseDto } from './validations/register.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { logoutResponseDto } from './validations/logout.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'Realiza login como cliente' })
    @ApiBody({ type: loginDto })
    @ApiResponse({
        status: 200,
        description: 'Login realizado com sucesso.',
        type: loginResponseDto
    })

    @Post("/login")
    @HttpCode(200)
    async login(@Body() data: loginDto): Promise<loginResponseDto> {
        return await this.authService.login(data)
    }

    @ApiOperation({ summary: 'Realiza logout' })
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'Login realizado com sucesso.',
        type: logoutResponseDto
    })

    @Post("/logout")
    @UseGuards(JWTguard)
    @HttpCode(200)
    async logout(@clientLoggedIn() client: any) {
        return await this.authService.logout(client)
    }

    @ApiOperation({ summary: 'Realiza o cadastro como cliente' })
    @ApiBody({ type: registerDto })
    
    @ApiResponse({
        status: 200,
        description: 'Login realizado com sucesso.',
        type: registerResponseDto
    })

    @Post("/register")
    async register(@Body() data: registerDto) {
        return await this.authService.register(data)
    }


}
