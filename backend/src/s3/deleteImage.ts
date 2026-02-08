import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./client.js";
export async function deleteImage(imageKey : string){
  try{
    await s3.send(new DeleteObjectCommand({
      Bucket : process.env.AWS_BUCKET,
      Key : imageKey,
    }))
  }catch(err){
    throw new Error("delete image err")
  }
}