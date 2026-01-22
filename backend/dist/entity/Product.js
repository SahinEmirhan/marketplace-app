export default class Product {
    id;
    name;
    description;
    price;
    imageKey;
    owner;
    likes;
    constructor(name, description, price, imageKey, owner, likes = [], id = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageKey = imageKey;
        this.owner = owner;
        this.likes = likes;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
        return this;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
        return this;
    }
    getImageKey() {
        return this.imageKey;
    }
    setImageKey(imageKey) {
        this.imageKey = imageKey;
        return this;
    }
    getOwner() {
        return this.owner;
    }
    setOwner(owner) {
        this.owner = owner;
        return this;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(likes) {
        this.likes = likes;
        return this;
    }
    addLike(like) {
        this.likes.push(like);
        return this;
    }
    removeLike(like) {
        this.likes = this.likes.filter(l => l != like);
        return this;
    }
}
//# sourceMappingURL=Product.js.map