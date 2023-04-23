import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent<T> implements OnInit, OnDestroy {
  @Input() values: T[] = [];
  @Input() total = 0;
  @Output() onRequestData = new EventEmitter<{
    nameStartsWith: string;
    limit: number;
    offset: number;
  }>();
  @Output() onDataSelected = new EventEmitter<T>();

  public searchString = '';
  public searchStringUpdate$ = new Subject<string>();
  public searchResults: T[] = [];
  private limit = 10;
  private offset = 0;
  private destroyed$ = new Subject<void>();
  constructor() {}

  ngOnInit(): void {
    this.searchStringUpdate$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((searchString) => searchString.length >= 2),
        takeUntil(this.destroyed$)
      )
      .subscribe((searchString) => {
        this.offset = 0;
        this.searchResults = [];
        this.onRequestData.emit({
          nameStartsWith: searchString,
          limit: this.limit,
          offset: this.offset,
        });
      });
  }

  ngOnChanges(): void {
    this.searchResults.push(...this.values);
  }

  public selectData(data: T): void {
    this.onDataSelected.emit(data);
  }

  onScrollDown() {
    if (this.offset + this.limit >= this.total) {
      return;
    }
    this.offset += this.limit;
    this.onRequestData.emit({
      nameStartsWith: this.searchString,
      limit: this.limit,
      offset: this.offset,
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
