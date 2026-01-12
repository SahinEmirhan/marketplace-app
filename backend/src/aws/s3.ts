import { DeleteObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {PutObjectCommand } from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
  region: process.env.AWS_REGION as string
});


export async function saveImageToS3(imageBuffer : Buffer,  imageMimeType : string){
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


export async function getSignedImageUrlFromS3(imageKey : string){
  return await getSignedUrl(s3 , new GetObjectCommand({Bucket : process.env.AWS_BUCKET , Key : imageKey}) , {expiresIn : 3600});
}


export async function deleteImageFromS3(imageKey : string){
  try{
    await s3.send(new DeleteObjectCommand({
      Bucket : process.env.AWS_BUCKET,
      Key : imageKey,
    }))
  }catch(err){
    throw new Error("delete image err")
  }
}
