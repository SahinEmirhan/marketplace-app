export declare class Chat {
    private id;
    private productId;
    private ownerId;
    private likerId;
    constructor(productId: string, ownerId: string, likerId: string, id?: string | null);
    getProductId(): string;
    setProductId(productId: string): void;
    getOwnerId(): string;
    setOwnerId(ownerId: string): this;
    getLikerId(): string;
    setLikerId(likerId: string): this;
    getId(): string | null;
    setId(id: string): this;
}
//# sourceMappingURL=Chat.d.ts.map