import * as z from "zod"

export const AuthRequestSchema = z.object({
    email : z.email(),
    password : z.string().min(8)
});

export type AuthRequest = z.infer<typeof AuthRequestSchema>;