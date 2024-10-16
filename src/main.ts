import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './core/swagger/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  setupSwagger(app);
  await app.listen(5000,() =>{
    console.log("post:5000")
  });
}
bootstrap();


