import { database, type Genero, type Filme } from "../database/db.js";

export class GeneroDatasource {

  findAll(): Genero[] {
    return database.generosData;
  }

  findById(id: string): Genero | undefined {
    return database.generosData.find(genero => genero.id === id);
  }


  create(generoData: Omit<Genero, 'id'>): Genero {
    const maxId = Math.max(...database.generosData.map(g => parseInt(g.id)), 0);
    const newId = (maxId + 1).toString();

    const novoGenero: Genero = {
      id: newId,
      ...generoData
    };

    database.generosData.push(novoGenero);
    return novoGenero;
  }


  update(id: string, generoData: Partial<Omit<Genero, 'id'>>): Genero | null {
    const index = database.generosData.findIndex(genero => genero.id === id);

    if (index === -1) {
      return null;
    }

    const generoExistente = database.generosData[index];
    if (!generoExistente) {
      return null;
    }

    const generoAtualizado: Genero = {
      id: generoExistente.id,
      nome: generoData.nome ?? generoExistente.nome
    };

    database.generosData[index] = generoAtualizado;
    return generoAtualizado;
  }


  delete(id: string): boolean {
    const index = database.generosData.findIndex(genero => genero.id === id);

    if (index === -1) {
      return false;
    }

    database.generosData.splice(index, 1);


    const filmeGenerosIndexes = database.filmeGenerosData
      .map((fg, idx) => fg.generoId === id ? idx : -1)
      .filter(idx => idx !== -1);

    filmeGenerosIndexes.reverse().forEach(idx => {
      database.filmeGenerosData.splice(idx, 1);
    });

    return true;
  }


  exists(id: string): boolean {
    return database.generosData.some(genero => genero.id === id);
  }


  getFilmesByGeneroId(generoId: string): Filme[] {
    const filmeGeneros = database.filmeGenerosData.filter(
      filmeGenero => filmeGenero.generoId === generoId
    );

    const filmesIds = filmeGeneros.map(filmeGenero => filmeGenero.filmeId);

    return database.filmesData.filter(filme => filmesIds.includes(filme.id));
  }
}