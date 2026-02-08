import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./client.js";

export async function getSignedImageUrl(imageKey : string){
  return await getSignedUrl(s3 , new GetObjectCommand({Bucket : process.env.AWS_BUCKET , Key : imageKey}) , {expiresIn : 3600});
}