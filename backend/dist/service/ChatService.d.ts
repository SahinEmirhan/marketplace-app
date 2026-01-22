import { ChatResponse } from "../dto/response/ChatResponse.js";
import { MessageResponse } from "../dto/response/MessageResponse.js";
export declare class ChatService {
    private readonly productRepository;
    private readonly chatRepository;
    private readonly messageRepository;
    createChatRoom(productId: string, userId: string): Promise<ChatResponse>;
    getMyChats(userId: string): Promise<ChatResponse[]>;
    getChatMessages(userId: string, chatId: string): Promise<MessageResponse[]>;
}
//# sourceMappingURL=ChatService.d.ts.map