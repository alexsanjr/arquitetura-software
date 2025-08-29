/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus, Put } from '@nestjs/common';
import { AtoresService } from './atores.service';
import { CreateAtorDto } from './dto/create-ator.dto';
import { UpdateAtoreDto } from './dto/update-ator.dto';
import { HateoasHelper } from '../common/hateoas.helper';
import type { HateoasResponse } from '../common/hateoas.helper';

@Controller('atores')
export class AtoresController {
  constructor(private readonly atoresService: AtoresService) { }


  @Post()
  create(@Body() createAtorDto: CreateAtorDto): HateoasResponse<any> {
    try {
      const ator = this.atoresService.create(createAtorDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Ator criado com sucesso',
        data: ator,
        _links: HateoasHelper.createAtorLinks(ator.id)
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error instanceof Error ? error.message : 'Erro ao criar ator',
      }, HttpStatus.BAD_REQUEST);
    }
  }


  @Get()
  findAll(): HateoasResponse<any[]> {
    try {
      const atores = this.atoresService.findAll();
      const atoresComLinks = atores.map(ator => ({
        ...ator,
        _links: HateoasHelper.createAtorLinks(ator.id)
      }));
      return {
        statusCode: HttpStatus.OK,
        data: atoresComLinks,
        _links: HateoasHelper.createAtoresCollectionLinks()
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get(':id')
  findOne(@Param('id') id: string): HateoasResponse<any> {
    try {
      const ator = this.atoresService.findOne(+id);
      if (!ator) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Ator não encontrado',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        data: ator,
        _links: HateoasHelper.createAtorLinks(ator.id)
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: error instanceof Error ? error.message : 'Ator não encontrado',
      }, HttpStatus.NOT_FOUND);
    }
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateAtoreDto: UpdateAtoreDto): HateoasResponse<any> {
    try {
      const ator = this.atoresService.update(+id, updateAtoreDto);
      if (!ator) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Ator não encontrado',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Ator atualizado com sucesso',
        data: ator,
        _links: HateoasHelper.createAtorLinks(ator.id)
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error instanceof Error ? error.message : 'Erro ao atualizar ator',
      }, HttpStatus.BAD_REQUEST);
    }
  }


  @Delete(':id')
  remove(@Param('id') id: string): HateoasResponse<null> {
    try {
      this.atoresService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Ator removido com sucesso',
        _links: HateoasHelper.createAtoresCollectionLinks()
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: error instanceof Error ? error.message : 'Ator não encontrado',
      }, HttpStatus.NOT_FOUND);
    }
  }
}
