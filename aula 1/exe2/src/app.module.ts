/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AtorModule } from './ator/ator.module';
import { GeneroModule } from './genero/genero.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    AtorModule,
    GeneroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
