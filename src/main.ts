import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    // bufferLogs: true // for the same reason as below to use globally we need this option to buffer logs
  });
  // app.useLogger(app.get(LoggerService)) //this method can be used to user logger service globally
  app.enableCors()
  app.setGlobalPrefix('api/v1')
  await app.listen(3000);
}
bootstrap();
