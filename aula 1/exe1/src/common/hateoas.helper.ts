/* eslint-disable prettier/prettier */

export interface HateoasLink {
  rel: string;
  href: string;
  method: string;
}

export interface HateoasResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  _links: HateoasLink[];
}

export class HateoasHelper {
  private static baseUrl = 'http://localhost:3000';

  static createAtorLinks(atorId: number): HateoasLink[] {
    return [
      {
        rel: 'self',
        href: `${this.baseUrl}/atores/${atorId}`,
        method: 'GET'
      },
      {
        rel: 'update',
        href: `${this.baseUrl}/atores/${atorId}`,
        method: 'PUT'
      },
      {
        rel: 'delete',
        href: `${this.baseUrl}/atores/${atorId}`,
        method: 'DELETE'
      },
      {
        rel: 'all-atores',
        href: `${this.baseUrl}/atores`,
        method: 'GET'
      }
    ];
  }

  static createFilmeLinks(filmeId: number): HateoasLink[] {
    return [
      {
        rel: 'self',
        href: `${this.baseUrl}/filmes/${filmeId}`,
        method: 'GET'
      },
      {
        rel: 'update',
        href: `${this.baseUrl}/filmes/${filmeId}`,
        method: 'PUT'
      },
      {
        rel: 'delete',
        href: `${this.baseUrl}/filmes/${filmeId}`,
        method: 'DELETE'
      },
      {
        rel: 'atores',
        href: `${this.baseUrl}/filmes/${filmeId}/atores`,
        method: 'GET'
      },
      {
        rel: 'add-ator',
        href: `${this.baseUrl}/filmes/${filmeId}/atores`,
        method: 'POST'
      },
      {
        rel: 'all-filmes',
        href: `${this.baseUrl}/filmes`,
        method: 'GET'
      }
    ];
  }

  static createAtoresCollectionLinks(): HateoasLink[] {
    return [
      {
        rel: 'self',
        href: `${this.baseUrl}/atores`,
        method: 'GET'
      },
      {
        rel: 'create',
        href: `${this.baseUrl}/atores`,
        method: 'POST'
      }
    ];
  }

  static createFilmesCollectionLinks(): HateoasLink[] {
    return [
      {
        rel: 'self',
        href: `${this.baseUrl}/filmes`,
        method: 'GET'
      },
      {
        rel: 'create',
        href: `${this.baseUrl}/filmes`,
        method: 'POST'
      }
    ];
  }

  static createFilmeAtoresLinks(filmeId: number): HateoasLink[] {
    return [
      {
        rel: 'self',
        href: `${this.baseUrl}/filmes/${filmeId}/atores`,
        method: 'GET'
      },
      {
        rel: 'filme',
        href: `${this.baseUrl}/filmes/${filmeId}`,
        method: 'GET'
      },
      {
        rel: 'add-ator',
        href: `${this.baseUrl}/filmes/${filmeId}/atores`,
        method: 'POST'
      }
    ];
  }
}
