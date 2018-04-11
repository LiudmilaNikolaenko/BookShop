import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowcaseComponent } from './showcase/showcase.component';
import { BookComponent } from './book/book.component';
import { BookAddComponent } from './book_add/book-add.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'book/new', component: BookAddComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/showcase', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
