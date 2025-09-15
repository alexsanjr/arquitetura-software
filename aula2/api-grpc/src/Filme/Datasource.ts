import { database, type Filme, type Ator, type Genero } from "../database/db.js";

export class FilmeDatasource {

  findAll(): Filme[] {
    return database.filmesData;
  }

  findById(id: string): Filme | undefined {
    return database.filmesData.find(filme => filme.id === id);
  }


  create(filmeData: Omit<Filme, 'id'>): Filme {
    const maxId = Math.max(...database.filmesData.map(f => parseInt(f.id)), 0);
    const newId = (maxId + 1).toString();

    const novoFilme: Filme = {
      id: newId,
      ...filmeData
    };

    database.filmesData.push(novoFilme);
    return novoFilme;
  }

  update(id: string, filmeData: Partial<Omit<Filme, 'id'>>): Filme | null {
    const index = database.filmesData.findIndex(filme => filme.id === id);

    if (index === -1) {
      return null;
    }

    const filmeExistente = database.filmesData[index];
    if (!filmeExistente) {
      return null;
    }

    const filmeAtualizado: Filme = {
      id: filmeExistente.id,
      titulo: filmeData.titulo ?? filmeExistente.titulo,
      anoDeLancamento: filmeData.anoDeLancamento ?? filmeExistente.anoDeLancamento
    };

    database.filmesData[index] = filmeAtualizado;
    return filmeAtualizado;
  }


  delete(id: string): boolean {
    const index = database.filmesData.findIndex(filme => filme.id === id);

    if (index === -1) {
      return false;
    }

    database.filmesData.splice(index, 1);


    const filmesAtoresIndexes = database.filmesAtoresData
      .map((fa, idx) => fa.filmeId === id ? idx : -1)
      .filter(idx => idx !== -1);

    filmesAtoresIndexes.reverse().forEach(idx => {
      database.filmesAtoresData.splice(idx, 1);
    });


    const filmeGenerosIndexes = database.filmeGenerosData
      .map((fg, idx) => fg.filmeId === id ? idx : -1)
      .filter(idx => idx !== -1);

    filmeGenerosIndexes.reverse().forEach(idx => {
      database.filmeGenerosData.splice(idx, 1);
    });

    return true;
  }


  exists(id: string): boolean {
    return database.filmesData.some(filme => filme.id === id);
  }

  getAtoresByFilmeId(filmeId: string): Ator[] {
    const filmesAtores = database.filmesAtoresData.filter(
      filmeAtor => filmeAtor.filmeId === filmeId
    );

    const atoresIds = filmesAtores.map(filmeAtor => filmeAtor.atorId);

    return database.atoresData.filter(ator => atoresIds.includes(ator.id));
  }


  addAtorToFilme(filmeId: string, atorId: string): boolean {

    if (!this.exists(filmeId)) return false;
    if (!database.atoresData.some(a => a.id === atorId)) return false;


    const exists = database.filmesAtoresData.some(
      fa => fa.filmeId === filmeId && fa.atorId === atorId
    );

    if (exists) return false;


    database.filmesAtoresData.push({ filmeId, atorId });
    return true;
  }

  removeAtorFromFilme(filmeId: string, atorId: string): boolean {
    const index = database.filmesAtoresData.findIndex(
      fa => fa.filmeId === filmeId && fa.atorId === atorId
    );

    if (index === -1) return false;

    database.filmesAtoresData.splice(index, 1);
    return true;
  }
}
