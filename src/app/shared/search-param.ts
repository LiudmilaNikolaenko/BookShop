export class SearchParam {

  constructor(
    public author: string,
    public title: string,
    public isbn: string,
    public formatId: string,
    public pages_gte: string, 
    public pages_lte: string,
    public price_gte: string, 
    public price_lte: string) { }
}