import { type IProductModel} from "../Product.js";
import { ProductPageResponse } from "../../../dto/response/ProductPageResponse.js";
import { productsToProductResponseList } from "./productsToProductResponseList.js";
export async function pageTheProducts(model : IProductModel,  query : Object , page : number , size : number) : Promise<ProductPageResponse>{
    const products = await model.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * size)
        .limit(size);
    
        if(!products || products.length == 0){
            return new ProductPageResponse(page, size, 0, 0, []);
        }
    
        const totalProducts = await model.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / size);
        return new ProductPageResponse(page, size, totalProducts ,totalPages , await productsToProductResponseList(products));
}