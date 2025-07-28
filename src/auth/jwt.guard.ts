import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JWTguard extends AuthGuard('jwt') {
    handleRequest<TClient = any>(err: any, client: any, info: any, context: ExecutionContext, status?: any): TClient {

        if (info) {
            throw new UnauthorizedException('Token inválido ou expirado');
        }
        
        if (!client) {
            throw new UnauthorizedException('Token não fornecido ou credencial inválida');
        }

        return client
    }
}