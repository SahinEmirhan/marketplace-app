import Product from "../../entity/Product.js";
export class ProductMapper {
    static toDomain(doc) {
        const product = new Product(doc.name, doc.description, doc.price, doc.imageKey, doc.owner, doc.likes, doc._id);
        return product;
    }
    static toPersistance(product) {
        return {
            _id: product.getId() || null,
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            imageKey: product.getImageKey(),
            owner: product.getOwner(),
            likes: product.getLikes()
        };
    }
}
//# sourceMappingURL=ProductMapper.js.map