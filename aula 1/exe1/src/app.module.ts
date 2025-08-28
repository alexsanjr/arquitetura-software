import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtoresModule } from './atores/atores.module';

@Module({
  imports: [AtoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
