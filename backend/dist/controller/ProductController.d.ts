import type { Request, Response } from "express";
export declare function getProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getMyProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function removeProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function likeProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=ProductController.d.ts.map