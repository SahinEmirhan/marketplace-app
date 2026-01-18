export class MessageResponse{
    private content : string;
    private senderType : string;

    constructor(content : string , senderType : string){
        this.content = content;
        this.senderType = senderType;
    }

}