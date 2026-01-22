import { Chat } from "../entity/Chat.js";
export declare class ChatRepository {
    findOrCreateChat(chat: Chat): Promise<Chat>;
    findChat(chatId: string): Promise<Chat>;
    findMyChats(userId: string): Promise<Chat[]>;
}
//# sourceMappingURL=ChatRepository.d.ts.map