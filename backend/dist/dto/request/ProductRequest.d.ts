import * as z from "zod";
export declare const ProductRequestSchema: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodPipe<z.ZodTransform<number, unknown>, z.ZodNumber>;
    description: z.ZodString;
}, z.core.$strip>;
export type ProductRequest = z.infer<typeof ProductRequestSchema>;
//# sourceMappingURL=ProductRequest.d.ts.map