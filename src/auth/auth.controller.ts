import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './validations/login.dto';
import { JWTguard } from './jwt.guard';
import { clientLoggedIn } from './decorators/clientLoggedIn.decorator';
import { registerDto } from './validations/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post("/login")
    @HttpCode(200)
    async login(@Body() data: loginDto) {
        return await this.authService.login(data)
    }

    @Post("/logout")
    @UseGuards(JWTguard)
    async logout(@clientLoggedIn() client: any) {
        return await this.authService.logout(client)
    }

    @Post("/register")
    async register(@Body() data: registerDto) {
        return await this.authService.register(data)
    }


}
