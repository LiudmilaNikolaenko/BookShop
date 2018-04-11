export class Book {
  
  constructor(
    public id: number,
    public author: string,
    public title: string,
    public isbn: string,
    public pages: number,
    public publisherId: number,
    public formatId: number,
    public description: string,
    public price: number) {  }
}