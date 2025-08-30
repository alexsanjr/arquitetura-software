import { Injectable, Param } from "@nestjs/common";
import { FilmeService } from "./filme.service";
import { Filme } from "./filme.model";
import { Args, Mutation, Query } from "@nestjs/graphql";

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
}
