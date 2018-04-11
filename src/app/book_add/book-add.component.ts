import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BookService, Book, City, Country, Format, Publisher } from '../shared/index';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html'
})
export class BookAddComponent implements OnInit {
  book: Book = new Book(0, "", "", "", 0, 0, 0, "", 0);
  books: Book[] = [];
  cities: City[] = [];
  filteredCities: City[] = [];
  countries: Country[] = [];
  formats: Format[] = [];
  publishers: Publisher[] = [];
  filteredPublishers: Publisher[] = [];
  errorMessage: string = "";
  bookForm: FormGroup;

  constructor(private service: BookService,
        private fb: FormBuilder,
        private router: Router) { }

  ngOnInit() {
    this.getDatas();
    this.buildForm();
  }

  public checkError(element: string, errorType: string) {
    return this.bookForm.get(element).hasError(errorType) &&
      this.bookForm.get(element).touched
  }

  public onSubmit() {
    this.book.id = this.books.length + 1;
    this.book.author = this.bookForm.value.author;
    this.book.title = this.bookForm.value.title;
    this.book.isbn = this.bookForm.value.isbn;
    this.book.pages = this.bookForm.value.pages;
    this.book.publisherId = this.bookForm.value.companyId;
    this.book.formatId = this.bookForm.value.formatId;
    this.book.description = this.bookForm.value.description;
    this.book.price = parseFloat(this.bookForm.value.price);

    this.service.addBook(this.book).subscribe(
      () => this.goBack(),
      error => this.errorMessage += error
    );
  }

  public goBack() {
    this.router.navigate(['book']);
  }

  private getDatas() {
    this.service.getBooks().subscribe(
      books => this.books = books,
      error => this.errorMessage += error
    );

    this.service.getCities().subscribe(
      cities => this.cities = cities,
      error => this.errorMessage += error
    );

    this.service.getCountries().subscribe(
      countries => this.countries = countries,
      error => this.errorMessage += error
    );

    this.service.getFormats().subscribe(
      formats => this.formats = formats,
      error => this.errorMessage += error
    );

    this.service.getPublishers().subscribe(
      publishers => this.publishers = publishers,
      error => this.errorMessage += error
    );

    this.filteredCities = this.cities;
    this.filteredPublishers = this.publishers;
  }

  private buildForm() {
    this.bookForm = this.fb.group({
      author: ["", Validators.required],
      title: ["", Validators.required],
      isbn: ["", [
        Validators.required,
        Validators.pattern("[0-9]{10}")
      ]],
      pages: [0, Validators.required],
      formatId: [0, Validators.required],
      description: ["",  Validators.required],
      price: ["", [
        Validators.required,
        Validators.pattern("[0-9]+\.[0-9]{2}")
      ]],
      countryId: [0, Validators.required],
      cityId: [0, Validators.required],
      companyId: [0, Validators.required]
    });

    this.bookForm.get('countryId').valueChanges.subscribe(val => {
      this.filteredCities = [];
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].countryId == this.bookForm.get('countryId').value) {
          this.filteredCities.push(this.cities[i])
        }
      };
      this.bookForm.patchValue({
        cityId: 0,
        companyId: 0
      })
    });

    this.bookForm.get('cityId').valueChanges.subscribe(val => {
      this.filteredPublishers = [];
      for (let i = 0; i < this.publishers.length; i++) {
        if (this.publishers[i].cityId == this.bookForm.get('cityId').value) {
          this.filteredPublishers.push(this.publishers[i])
        }
      };
      this.bookForm.patchValue({
        companyId: 0
      })
    });
  }

}
