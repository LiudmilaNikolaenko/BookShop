import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService, Book, Format, SearchParam } from '../shared/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  searchParams: SearchParam = new SearchParam("", "", "", "", "", "", "", "");
  books: Book[] = [];
  formats: Format[] = [];
  errorMessage: string = "";

  constructor(private service: BookService,
    private router: Router) { }

  ngOnInit() {
    this.getDatas();
  }

  public onValueChange(isValid: boolean) {
    if (isValid) {
      this.service.updateSearchParams(this.searchParams);
      this.service.searchBooks().subscribe(
        res => this.books = res.json(),
        error => this.errorMessage += error
      );
    }
  }

  public bookInfo(id: number) {
    this.router.navigate(['book', id.toString()]);
  }

  private getDatas() {
    this.searchParams = this.service.getSearchParams();
    
    this.service.searchBooks().subscribe(
      res => this.books = res.json(),
      error => this.errorMessage += error
    )

    this.service.getFormats().subscribe(
      formats => this.formats = formats,
      error => this.errorMessage += error
    );

  }
}
