import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService, Book } from '../shared/index';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html'
})
export class ShowcaseComponent implements OnInit {
  books: Book[] = [];
  errorMessage: string = "";

  constructor(private service: BookService,
    private router: Router) { }

  ngOnInit() {
    this.getDatas();
  }

  public bookInfo(id: number) {
    this.router.navigate(['book', id.toString()]);
  }

  private getDatas() {
    this.service.getBooks().subscribe(
      books => this.books = books,
      error => this.errorMessage = error
    );
    
  }

}
