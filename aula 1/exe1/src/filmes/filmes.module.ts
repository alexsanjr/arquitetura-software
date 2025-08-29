import { Module } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { FilmesController } from './filmes.controller';
import { FilmesRepository } from './filmes.repository';

@Module({
  controllers: [FilmesController],
  providers: [FilmesService, FilmesRepository],
})
export class FilmesModule { }
