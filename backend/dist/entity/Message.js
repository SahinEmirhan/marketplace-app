export class Message {
    id;
    chatId;
    senderId;
    content;
    constructor(chatId, senderId, content, id = null) {
        this.chatId = chatId;
        this.senderId = senderId;
        this.content = content;
        this.id = id;
    }
    getChatId() {
        return this.chatId;
    }
    setChatId(chatId) {
        this.chatId = chatId;
        return this;
    }
    getSenderId() {
        return this.senderId;
    }
    setSenderId(senderId) {
        this.senderId = senderId;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
        return this;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
        return this;
    }
}
//# sourceMappingURL=Message.js.map