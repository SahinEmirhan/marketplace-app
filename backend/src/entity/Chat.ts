export class Chat{
    private id : string | null;
    private productId : string;
    private ownerId : string;
    private likerId : string;

    constructor(productId : string, ownerId : string , likerId : string , id : string | null = null ){
        this.productId = productId;
        this.ownerId = ownerId;
        this.likerId = likerId;
        this.id = id;
    }

    getProductId(){
        return this.productId;
    }

    setProductId(productId : string){
        this.productId = productId;
    }

    getOwnerId(){
        return this.ownerId;
    }


    setOwnerId(ownerId : string){
        this.ownerId = ownerId;
        return this;
    }

    getLikerId(){
        return this.likerId;
    }

    setLikerId(likerId : string){
        this.likerId = likerId;
        return this;
    }

    getId(){
        return this.id;
    }

    setId(id : string){
        this.id = id;
        return this;
    }

}