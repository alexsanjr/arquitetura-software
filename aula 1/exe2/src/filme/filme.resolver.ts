import { Injectable, Param } from "@nestjs/common";
import { FilmeService } from "./filme.service";
import { Filme } from "./filme.model";
import { Args, Mutation, Query, ResolveField, Parent } from "@nestjs/graphql";
import { Ator } from "../ator/ator.model";
import { Genero } from "../genero/genero.model";

@Injectable()
export class FilmeResolver {
  constructor(private readonly filmeService: FilmeService) { }

  @Query(() => [Filme], { name: 'filmes' })
  getFilmes(): Filme[] {
    return this.filmeService.findAll();
  }

  @Query(() => Filme, { name: 'filme' })
  getFilme(@Args('id') id: string): Filme {
    const filme = this.filmeService.findById(id);
    if (!filme) {
      throw new Error('Filme não encontrado');
    }
    return filme;
  }

  @Mutation(() => Filme, { name: 'criarFilme' })
  createFilme(
    @Args('titulo') titulo: string,
    @Args('anoDeLancamento') anoDeLancamento: number
  ): Filme {
    return this.filmeService.create({ titulo, anoDeLancamento });
  }

  @Mutation(() => Filme, { name: 'atualizarFilme' })
  updateFilme(
    @Args('id') id: string,
    @Args('titulo') titulo: string,
    @Args('anoDeLancamento') anoDeLancamento: number
  ): Filme | undefined {
    return this.filmeService.update(id, { titulo, anoDeLancamento });
  }

  @Mutation(() => Boolean, { name: 'removerFilme' })
  removeFilme(@Args('id') id: string): boolean {
    return this.filmeService.remove(id);
  }

  @Mutation(() => Filme, { name: 'adicionarAtoresEmFilme' })
  adicionarAtoresEmFilme(
    @Args('filmeId') filmeId: string,
    @Args({ name: 'atorIds', type: () => [String] }) atorIds: string[]
  ): Filme {
    const resultado = this.filmeService.adicionarAtoresEmFilme(filmeId, atorIds);
    if (!resultado) {
      throw new Error('Filme não encontrado');
    }
    const atores = this.filmeService.getAtoresDoFilme(filmeId);
    return { ...resultado, atores };
  }

  @Mutation(() => Filme, { name: 'removerAtorDeFilme' })
  removerAtorDeFilme(
    @Args('filmeId') filmeId: string,
    @Args('atorId') atorId: string
  ): Filme {
    const resultado = this.filmeService.removerAtorDeFilme(filmeId, atorId);
    if (!resultado) {
      throw new Error('Filme não encontrado');
    }
    // Garantir que os atores atualizados sejam populados na resposta
    const atores = this.filmeService.getAtoresDoFilme(filmeId);
    return { ...resultado, atores };
  }

  @Mutation(() => Filme, { name: 'adicionarGenerosEmFilme' })
  adicionarGenerosEmFilme(
    @Args('filmeId') filmeId: string,
    @Args({ name: 'generoIds', type: () => [String] }) generoIds: string[]
  ): Filme {
    const resultado = this.filmeService.adicionarGenerosAoFilme(filmeId, generoIds);
    if (!resultado) {
      throw new Error('Filme não encontrado');
    }
    // Garantir que os gêneros sejam populados na resposta
    const generos = this.filmeService.getGenerosDoFilme(filmeId);
    return { ...resultado, generos };
  }

  @ResolveField('atores', () => [Ator])
  getAtores(@Parent() filme: Filme): Ator[] {
    const atores = this.filmeService.getAtoresDoFilme(filme.id);
    return atores || [];
  }

  @ResolveField('generos', () => [Genero])
  getGeneros(@Parent() filme: Filme): Genero[] {
    const generos = this.filmeService.getGenerosDoFilme(filme.id);
    return generos || [];
  }
}
