import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { BookService, Book, City, Country, Format, Publisher } from '../shared/index';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  book: Book = new Book(0, "", "", "", 0, 0, 0, "", 0);
  publisher: Publisher = new Publisher(0, 0, "");
  city: City = new City(0, 0, "");
  country: Country = new Country(0, "");
  format: Format = new Format(0, "");
  errorMessage: string = "";

  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: BookService) { }

  ngOnInit() {
    this.getDatas();
  }

  private getDatas() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = parseInt(params["id"]);

      this.service.getBook(id).subscribe(
        book => {
          this.book = book;
          this.service.getFormat(this.book.formatId).subscribe(
            format => this.format = format,
            error => this.errorMessage += error
          );
          this.service.getPublisher(this.book.publisherId).subscribe(
            publisher => {
              this.publisher = publisher;
              this.service.getCity(this.publisher.cityId).subscribe(
                city => {
                  this.city = city;
                  this.service.getCountry(this.city.countryId).subscribe(
                    country => this.country = country,
                    error => this.errorMessage += error
                  );
                },
                error => this.errorMessage += error
              );
            },
            error => this.errorMessage += error
          );
        },
        error => this.errorMessage += error
      );

      

      

      

      
            
    });
  }

}
