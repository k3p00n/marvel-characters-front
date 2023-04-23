import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Character } from '../models/character.model';
import { HttpClient } from '@angular/common/http';
import { Data, ListResponse } from '../models/list-response.model';

@Injectable()
export class CharacterService {
  private readonly publicKey: string;
  private readonly url: string;

  constructor(
    private readonly http: HttpClient,
  ) {
    this.url = environment.marvel.url;
    this.publicKey = environment.marvel.publicKey;
  }

  public getCharacters(
    nameStartsWith: string,
    limit: number,
    offset: number
  ): Observable<Data<Character>> {
    const options = {
      params: {
        apikey: this.publicKey,
        nameStartsWith,
        limit,
        offset,
      }
    };

    return this.http.get<ListResponse<Character>>(`${this.url}/characters`, options)
      .pipe(
        map(response => response.data)
      );
  }
}
