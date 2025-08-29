
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AtorService } from './ator.service';
import { Ator } from './ator.model';

@Resolver(() => Ator)
export class AtorResolver {
  constructor(private readonly service: AtorService) { }


  @Query(() => [Ator], { name: 'atores' })
  getAtores(): Ator[] {
    return this.service.findAll();
  }


  @Query(() => Ator, { name: 'ator' })
  getAtor(@Args('id') id: string): Ator {
    const ator = this.service.findOne(id);
    if (!ator) {
      throw new Error('Ator não encontrado');
    }
    return ator;
  }

  @Mutation(() => Ator, { name: 'criarAtor' })
  createAtor(
    @Args('nome') nome: string,
    @Args('dataDeNascimento') dataDeNascimento: number,
    @Args('nacionalidade') nacionalidade: string
  ): Ator {
    return this.service.create({ nome, dataDeNascimento, nacionalidade });
  }
}