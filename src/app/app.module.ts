import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookAddComponent } from './book_add/book-add.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchComponent } from './search/search.component';
import { ShowcaseComponent } from './showcase/showcase.component';

import { BookService } from './shared/index';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    BookComponent,
    BookAddComponent,
    NavigationComponent,
    SearchComponent,
    ShowcaseComponent
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
