import { Module } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroResolver } from './genero.resolver';
import { GeneroDataSource } from './genero.datasource';

@Module({
  providers: [GeneroService, GeneroResolver, GeneroDataSource],
})
export class GeneroModule { }
