import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common'
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  Global Pipes: 
  use nestjs pipes for the validation of incomming payload object.
  whitelist set true to exclude unwanted data from the payload object.
  transform set true to transform incomming payload object.
  */
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true
  }));
  /* 
  Swagger configurations:
  setTitle to set title for api's 
  setDescription to set discription for the api's
  setVersion to set version for the api's
  addBearerAuth to set he bearer auth token in the api headers
  */
  const config = new DocumentBuilder()
      .setTitle('Blog API')
      .setDescription('Blog API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3005);
}
bootstrap();
