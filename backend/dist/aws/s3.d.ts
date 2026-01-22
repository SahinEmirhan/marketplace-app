export declare function saveImageToS3(imageBuffer: Buffer, imageMimeType: string): Promise<string>;
export declare function getSignedImageUrlFromS3(imageKey: string): Promise<string>;
export declare function deleteImageFromS3(imageKey: string): Promise<void>;
//# sourceMappingURL=s3.d.ts.map