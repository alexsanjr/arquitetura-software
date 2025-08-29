/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { CreateFilmeDto } from './dto/create-filme.dto';

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) { }

  @Get()
  findAll() {
    try {
      const filmes = this.filmesService.findAll();
      return filmes;
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      const filme = this.filmesService.findById(+id);
      return filme;
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
  getAtoresByFilmeId(@Param('id') id: string) {
    try {
      const atores = this.filmesService.getAtoresByFilmeId(+id);
      return atores;
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
  ) {
    try {
      this.filmesService.addAtorToFilme(+filmeId, body.atorId);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Ator adicionado ao filme com sucesso'
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error instanceof Error ? error.message : 'Erro ao adicionar ator ao filme',
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
