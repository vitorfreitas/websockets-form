import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormGateway } from './form/form.gateway';
import { FormService } from './form/form.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FormGateway, FormService],
})
export class AppModule {}
