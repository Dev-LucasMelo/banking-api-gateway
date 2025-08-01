import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,

    exceptionFactory: (errors: ValidationError[]) => {
      const extractErrors = (errors: ValidationError[], parentPath = '') => {
        return errors.flatMap(error => {
          const campo = parentPath ? `${parentPath}.${error.property}` : error.property;

          const current = error.constraints
            ? [{ campo, erros: Object.values(error.constraints) }]
            : [];

          const children = error.children?.length
            ? extractErrors(error.children, campo)
            : [];

          return [...current, ...children];
        });
      };

      const formattedErrors = extractErrors(errors);

      return new BadRequestException({
        status: 'erro',
        mensagem: 'Falha na validação dos dados',
        erros: formattedErrors,
      });
    },
  }));

  //swagger 
  const config = new DocumentBuilder()
    .setTitle('API GATEWAY')
    .setDescription('Essa interface tem como objetivo ser a interface principal da aplicação e rotear as chamadas')
    .setVersion('1.0')
    .addTag('api') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
