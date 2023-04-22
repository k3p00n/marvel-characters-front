import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Character } from '../models/character.model';
import { HttpClient } from '@angular/common/http';
import { ListResponse } from '../models/list-response.model';\
import { Md5 } from 'ts-md5';

@Injectable()
export class CharacterService {
  private publicKey = '';
  private privateKey = '';
  private url = '';

  constructor(
    private readonly http: HttpClient,
  ) {
    this.url = environment.marvel.url;
    this.publicKey = environment.marvel.publicKey;
    this.privateKey = environment.marvel.privateKey;
  }


  public getCharacters(
    nameStartsWith: string,
    limit: number,
    offset: number
  ): Observable<Character[]> {
    const ts = new Date().getTime();
    const hash = Md5.hashStr(`${ts}${this.privateKey}${this.publicKey}`);
    const options = {
      params: {
        ts,
        apikey: this.publicKey,
        hash,
        nameStartsWith,
        limit,
        offset,
      }
    };

    return this.http.get<ListResponse<Character>>(`${this.url}/characters`, options)
      .pipe(
        map(response => response.data.results)
      );
  }
}
