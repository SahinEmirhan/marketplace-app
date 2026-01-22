import * as z from "zod";
export declare const AuthRequestSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type AuthRequest = z.infer<typeof AuthRequestSchema>;
//# sourceMappingURL=AuthRequest.d.ts.map