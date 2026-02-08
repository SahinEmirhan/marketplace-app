import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./client.js";
export async function saveImage(imageBuffer : Buffer,  imageMimeType : string){
  const key = `images/${crypto.randomUUID()}.${imageMimeType.split("/")[1]}`;
          await s3.send(
          new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET!,
          Key: key,
          Body: imageBuffer,
          ContentType: imageMimeType
          })
      );
      return key;
}