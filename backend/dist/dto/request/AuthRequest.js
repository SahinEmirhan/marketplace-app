import * as z from "zod";
export const AuthRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});
//# sourceMappingURL=AuthRequest.js.map