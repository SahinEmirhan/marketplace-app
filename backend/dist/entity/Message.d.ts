export declare class Message {
    private id;
    private chatId;
    private senderId;
    private content;
    constructor(chatId: string, senderId: string, content: string, id?: string | null);
    getChatId(): string;
    setChatId(chatId: string): this;
    getSenderId(): string;
    setSenderId(senderId: string): void;
    getContent(): string;
    setContent(content: string): this;
    getId(): string | null;
    setId(id: string): this;
}
//# sourceMappingURL=Message.d.ts.map