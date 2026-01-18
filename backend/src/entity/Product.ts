
export default class Product{
    private id : string | null;
    private name : string;
    private description : string;
    private price : number;
    private imageKey : string;
    private owner : string;
    private likes : string[];

    constructor(name : string , description : string , price : number , imageKey : string , owner : string , likes : string[] = [] , id : string | null = null, ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageKey = imageKey;
        this.owner = owner;
        this.likes = likes;
    }

    getId(){
        return this.id;
    }

    setId(id : string){
        this.id = id;
        return this;
    }


    getName(){
        return this.name;
    }

    setName(name : string){
        this.name = name;
        return this;
    }


    getDescription(){
        return this.description;
    }

    setDescription(description : string){
        this.description = description;
        return this;
    }

    getPrice(){
        return this.price;
    } 

    setPrice(price : number){
        this.price = price;
        return this;
    }

    getImageKey(){
        return this.imageKey;
    }

    setImageKey(imageKey : string){
        this.imageKey = imageKey;
        return this;
    }

    getOwner(){
        return this.owner;
    }

    setOwner(owner : string){
        this.owner = owner;
        return this;
    }

    getLikes(){
        return this.likes;
    }

    setLikes(likes : string[]){
        this.likes = likes;
        return this;
    }

    addLike(like : string){
        this.likes.push(like);
        return this;
    }

    removeLike(like : string){
        this.likes = this.likes.filter(l => l != like);
        return this;
    }


    

}