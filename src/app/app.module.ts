import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharacterService } from './services/character.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, SearchComponent],
  imports: [BrowserModule, HttpClientModule, InfiniteScrollModule, FormsModule],
  providers: [CharacterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
