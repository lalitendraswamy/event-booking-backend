import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './core/swagger/swagger'; 
// import { MyLogger } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // app.useLogger(app.get(MyLogger));
  setupSwagger(app);
  await app.listen(5000,() =>{
    console.log("post:5000")
  });
}
bootstrap();


