export class Message{
    private id : string | null
    private chatId : string;
    private senderId : string;
    private content : string;

    constructor(chatId : string , senderId : string , content : string , id : string | null = null){
        this.chatId = chatId;
        this.senderId = senderId;
        this.content = content;
        this.id = id;
    }

    getChatId(){
        return this.chatId;
    }

    setChatId(chatId : string){
        this.chatId = chatId;
        return this;
    }

    getSenderId(){
        return this.senderId;
    }

    setSenderId(senderId : string){
        this.senderId = senderId;
    }

    getContent(){
        return this.content;
    }

    setContent(content : string){
        this.content = content;
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