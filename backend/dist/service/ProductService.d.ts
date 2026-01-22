import type { ProductRequest } from "../dto/request/ProductRequest.js";
import { ProductResponse } from "../dto/response/ProductResponse.js";
export declare class ProductService {
    private readonly productRepository;
    getProducts(userId: string): Promise<ProductResponse[]>;
    getMyProducts(userId: string): Promise<ProductResponse[]>;
    getProduct(productId: string, userId: string): Promise<ProductResponse>;
    private productsToProductResponseList;
    createProduct(product: ProductRequest, ownerId: string, image: Express.Multer.File): Promise<void>;
    removeProduct(productId: string, userId: string): Promise<void>;
    updateProduct(product: ProductRequest, image: Express.Multer.File, ownerId: string, productId: string): Promise<void>;
    likeProduct(productId: string, userId: string): Promise<void>;
}
//# sourceMappingURL=ProductService.d.ts.map