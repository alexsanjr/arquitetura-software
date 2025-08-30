import { Module } from '@nestjs/common';
import { FilmeDataSource } from './filme.datasource';
import { FilmeResolver } from './filme.resolver';
import { FilmeService } from './filme.service';

@Module({
  providers: [FilmeService, FilmeResolver, FilmeDataSource],
})
export class FilmeModule { }
