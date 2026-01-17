import Product from "../../entity/Product.js";
export class ProductMapper{
    static toDomain(doc : any){
        const product = new Product(doc.name , doc.description , doc.price , doc.imageKey, doc.owner , doc.likes , doc._id);
        return product;
    }


    static toPersistance(product : Product){
        return {
            _id : product.getId() || null,
            name : product.getName(),
            description : product.getDescription(),
            price : product.getPrice(),
            imageKey : product.getImageKey(),
            owner : product.getOwner(),
            likes : product.getLikes()
        }
    }


}