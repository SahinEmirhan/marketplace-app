export class ProductResponse {
    id;
    name;
    description;
    price;
    imageUrl;
    isLiked;
    constructor(id, name, description, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }
    setIsLiked(isLiked) {
        this.isLiked = isLiked;
        return this;
    }
}
//# sourceMappingURL=ProductResponse.js.map