export class Chat {
    id;
    productId;
    ownerId;
    likerId;
    constructor(productId, ownerId, likerId, id = null) {
        this.productId = productId;
        this.ownerId = ownerId;
        this.likerId = likerId;
        this.id = id;
    }
    getProductId() {
        return this.productId;
    }
    setProductId(productId) {
        this.productId = productId;
    }
    getOwnerId() {
        return this.ownerId;
    }
    setOwnerId(ownerId) {
        this.ownerId = ownerId;
        return this;
    }
    getLikerId() {
        return this.likerId;
    }
    setLikerId(likerId) {
        this.likerId = likerId;
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
//# sourceMappingURL=Chat.js.map