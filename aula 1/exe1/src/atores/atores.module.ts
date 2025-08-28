import { Module } from '@nestjs/common';
import { AtoresService } from './atores.service';
import { AtoresController } from './atores.controller';
import { AtoresRepository } from './atores.repository';

@Module({
  controllers: [AtoresController],
  providers: [AtoresService, AtoresRepository],
})
export class AtoresModule { }
