import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtoresModule } from './atores/atores.module';
import { FilmesModule } from './filmes/filmes.module';

@Module({
  imports: [AtoresModule, FilmesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
