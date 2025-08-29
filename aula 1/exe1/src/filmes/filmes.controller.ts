/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { HateoasHelper } from '../common/hateoas.helper';
import type { HateoasResponse } from '../common/hateoas.helper';

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) { }

  @Get()
  findAll(): HateoasResponse<any[]> {
    try {
      const filmes = this.filmesService.findAll();
      const filmesComLinks = filmes.map(filme => ({
        ...filme,
        _links: HateoasHelper.createFilmeLinks(filme.id)
      }));
      return {
        statusCode: HttpStatus.OK,
        data: filmesComLinks,
        _links: HateoasHelper.createFilmesCollectionLinks()
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findById(@Param('id') id: string): HateoasResponse<any> {
    try {
      const filme = this.filmesService.findById(+id);
      return {
        statusCode: HttpStatus.OK,
        data: filme,
        _links: HateoasHelper.createFilmeLinks(filme.id)
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: error instanceof Error ? error.message : 'Filme não encontrado',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  create(@Body() createFilmeDto: CreateFilmeDto) {
    try {
      const filme = this.filmesService.create(createFilmeDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Filme criado com sucesso',
        data: filme
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error instanceof Error ? error.message : 'Erro ao criar filme',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    try {
      const filme = this.filmesService.update(+id, updateFilmeDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Filme atualizado com sucesso',
        data: filme
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error instanceof Error ? error.message : 'Erro ao atualizar filme',
      }, HttpStatus.BAD_REQUEST);
    }
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      this.filmesService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Filme removido com sucesso'
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: error instanceof Error ? error.message : 'Filme não encontrado',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id/atores')
  getAtoresByFilmeId(@Param('id') id: string): HateoasResponse<any[]> {
    try {
      const atores = this.filmesService.getAtoresByFilmeId(+id);
      const atoresComLinks = atores.map(ator => ({
        ...ator,
        _links: HateoasHelper.createAtorLinks(ator.id)
      }));
      return {
        statusCode: HttpStatus.OK,
        data: atoresComLinks,
        _links: HateoasHelper.createFilmeAtoresLinks(+id)
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: error instanceof Error ? error.message : 'Filme não encontrado',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post(':filmeId/atores')
  addAtorToFilme(
    @Param('filmeId') filmeId: string,
    @Body() body: { atorId: number }
  ): HateoasResponse<null> {
    try {
      this.filmesService.addAtorToFilme(+filmeId, body.atorId);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Ator adicionado ao filme com sucesso',
        _links: [
          ...HateoasHelper.createFilmeLinks(+filmeId),
          ...HateoasHelper.createFilmeAtoresLinks(+filmeId)
        ]
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error instanceof Error ? error.message : 'Erro ao adicionar ator ao filme',
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
