import type { HydratedDocument } from "mongoose";
import { ProductResponse } from "../../../dto/response/ProductResponse.js";
import { type IProduct }from "../Product.js";
import { getSignedImageUrl } from "../../../s3/getSignedImageUrl.js";

export async function productsToProductResponseList(products : HydratedDocument<IProduct>[]){
        let productResList : ProductResponse[] = [];
        for(let product of products){
            const signedImageUrl =  await getSignedImageUrl(product.imageKey);
            productResList.push(new ProductResponse(product._id.toString(), product.name , product.description , product.price , signedImageUrl))
        }
        return productResList;
}