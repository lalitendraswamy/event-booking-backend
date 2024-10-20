import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './core/swagger/swagger'; 
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from './core/logger/app-logger';
import { GlobalExceptionFilter } from './core/logger/globalException.filter';
// import { MyLogger } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // app.useLogger(app.get(MyLogger));

  app.useGlobalPipes(new ValidationPipe());

  const appLogger = app.get(AppLogger);
  app.useGlobalFilters(new GlobalExceptionFilter(appLogger));
  setupSwagger(app);
  await app.listen(5000,() =>{
    console.log("post:5000")
  });
}
bootstrap();


