import Product from "../../entity/Product.js";
export declare class ProductMapper {
    static toDomain(doc: any): Product;
    static toPersistance(product: Product): {
        _id: string | null;
        name: string;
        description: string;
        price: number;
        imageKey: string;
        owner: string;
        likes: string[];
    };
}
//# sourceMappingURL=ProductMapper.d.ts.map