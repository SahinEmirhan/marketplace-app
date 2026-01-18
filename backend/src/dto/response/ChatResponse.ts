export class ChatResponse{
    private chatId : string ;
    private productName : string;
    private productPrice : number;
    private productImage : string;

    constructor(chatId : string, productName : string , productPrice : number,  productImage : string  ){
        this.chatId = chatId;
        this.productName = productName;
        this.productPrice = productPrice
        this.productImage = productImage;
    }
}