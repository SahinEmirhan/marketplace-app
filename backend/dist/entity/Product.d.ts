export default class Product {
    private id;
    private name;
    private description;
    private price;
    private imageKey;
    private owner;
    private likes;
    constructor(name: string, description: string, price: number, imageKey: string, owner: string, likes?: string[], id?: string | null);
    getId(): string | null;
    setId(id: string): this;
    getName(): string;
    setName(name: string): this;
    getDescription(): string;
    setDescription(description: string): this;
    getPrice(): number;
    setPrice(price: number): this;
    getImageKey(): string;
    setImageKey(imageKey: string): this;
    getOwner(): string;
    setOwner(owner: string): this;
    getLikes(): string[];
    setLikes(likes: string[]): this;
    addLike(like: string): this;
    removeLike(like: string): this;
}
//# sourceMappingURL=Product.d.ts.map