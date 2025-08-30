
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AtorService } from './ator.service';
import { Ator } from './ator.model';
import { Filme } from 'src/filme/filme.model';

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

  @Mutation(() => Ator, { name: 'atualizarAtor' })
  updateAtor(
    @Args('id') id: string,
    @Args('nome') nome: string,
    @Args('dataDeNascimento') dataDeNascimento: number,
    @Args('nacionalidade') nacionalidade: string
  ): Ator | undefined {
    return this.service.update(id, { nome, dataDeNascimento, nacionalidade });
  }

  @Mutation(() => Boolean, { name: 'removerAtor' })
  removeAtor(@Args('id') id: string): boolean {
    return this.service.remove(id);
  }
}