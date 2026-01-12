export class ProductResponse{
    id : string | null;
    name : string;
    description : string;
    price : number;
    imageUrl : string;

    constructor(id : string | null , name : string , description : string , price : number , imageUrl : string){
        this.id = id;
        this.name = name; 
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

}