import { Module } from '@nestjs/common';
import { AtorService } from './ator.service';
import { AtorResolver } from './ator.resolver';
import { AtorDataSource } from './ator.datasource';

@Module({
  providers: [AtorService, AtorResolver, AtorDataSource]
})
export class AtorModule { }
