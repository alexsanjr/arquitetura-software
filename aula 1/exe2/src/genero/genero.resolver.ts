import { Resolver, Query, Args } from '@nestjs/graphql';
import { Genero } from './genero.model';
import { GeneroService } from './genero.service';

@Resolver(() => Genero)
export class GeneroResolver {
  constructor(private readonly generoService: GeneroService) { }

  @Query(() => [Genero], { name: 'generos' })
  getGeneros(): Genero[] {
    return this.generoService.findAll();
  }

  @Query(() => Genero, { name: 'genero' })
  getGenero(@Args('id') id: string): Genero {
    const genero = this.generoService.findById(id);
    if (!genero) {
      throw new Error('Gênero não encontrado');
    }
    return genero;
  }
}