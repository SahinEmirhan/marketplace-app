import {ProductResponse} from "./ProductResponse.js";

export class ProductPageResponse{
    page : number;
    size : number;
    totalDocuments : number;
    totalPages: number;
    products : ProductResponse[];

    constructor(page : number, size : number, totalDocuments : number, totalPages : number, products : ProductResponse[]){
        this.page = page;
        this.size = size;
        this.totalDocuments = totalDocuments;
        this.totalPages = totalPages;
        this.products = products;
    }

}