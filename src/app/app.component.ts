import { Component, OnDestroy } from '@angular/core';
import { CharacterService } from './services/character.service';
import { Subject, takeUntil } from 'rxjs';
import { Character } from './models/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private destroyed$ = new Subject<void>();
  public characters: string[] = [];
  public total = 0;
  constructor(private readonly characterService: CharacterService) {}

  public getCharacters(event: {
    nameStartsWith: string;
    limit: number;
    offset: number;
  }): void {
    const { nameStartsWith, limit, offset } = event;
    this.characterService
      .getCharacters(nameStartsWith, limit, offset)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.characters = data.results.map((character) => character.name);
        this.total = data.total;
      });
  }

  public selectCharacter(character: string): void {
    alert(character);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
