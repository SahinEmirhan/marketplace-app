import * as z from "zod"

export const ProductRequestSchema = z.object({
    name : z.string().min(2),
    price: z.preprocess((val) => Number(val),z.number().positive()),
    description : z.string().min(10),
})

export type ProductRequest = z.infer<typeof ProductRequestSchema>