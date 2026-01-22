import Product from "../entity/Product.js";
export declare class ProductRepository {
    getProductsNotOwnedBy(ownerId: string): Promise<Product[]>;
    getMyProducts(ownerId: string): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
    createProduct(product: Product): Promise<void>;
    removeProduct(id: string): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
//# sourceMappingURL=ProductRepository.d.ts.map