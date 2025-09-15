import { database, type Ator } from "../database/db.js";

export class AtorDatasource {

  findAll(): Ator[] {
    return database.atoresData;
  }

  findById(id: string): Ator | undefined {
    return database.atoresData.find(ator => ator.id === id);
  }

  findByFilmeId(filmeId: string): Ator[] {
    const filmesAtores = database.filmesAtoresData.filter(
      filmeAtor => filmeAtor.filmeId === filmeId
    );

    const atoresIds = filmesAtores.map(filmeAtor => filmeAtor.atorId);

    return database.atoresData.filter(ator => atoresIds.includes(ator.id));
  }


  create(atorData: Omit<Ator, 'id'>): Ator {
    const maxId = Math.max(...database.atoresData.map(a => parseInt(a.id)), 0);
    const newId = (maxId + 1).toString();

    const novoAtor: Ator = {
      id: newId,
      ...atorData
    };

    database.atoresData.push(novoAtor);

    return novoAtor;
  }

  update(id: string, atorData: Partial<Omit<Ator, 'id'>>): Ator | null {
    const index = database.atoresData.findIndex(ator => ator.id === id);

    if (index === -1) {
      return null;
    }

    const atorExistente = database.atoresData[index];
    if (!atorExistente) {
      return null;
    }

    const atorAtualizado: Ator = {
      id: atorExistente.id,
      nome: atorData.nome ?? atorExistente.nome,
      dataDeNascimento: atorData.dataDeNascimento ?? atorExistente.dataDeNascimento,
      nacionalidade: atorData.nacionalidade ?? atorExistente.nacionalidade
    };

    database.atoresData[index] = atorAtualizado;

    return atorAtualizado;
  }

  delete(id: string): boolean {
    const index = database.atoresData.findIndex(ator => ator.id === id);

    if (index === -1) {
      return false;
    }

    database.atoresData.splice(index, 1);

    const filmesAtoresIndex = database.filmesAtoresData.findIndex(fa => fa.atorId === id);
    if (filmesAtoresIndex !== -1) {
      database.filmesAtoresData.splice(filmesAtoresIndex, 1);
    }

    return true;
  }

  exists(id: string): boolean {
    return database.atoresData.some(ator => ator.id === id);
  }
}