import bcrypt from "bcrypt";

export async function verifyPassword(plainPassword : string , hashedPassword : string) : Promise<boolean>{
    const BCRYPT_SECRET = process.env.BCRYPT_SECRET;
    if (!BCRYPT_SECRET) {
        throw new Error('BCRYPT_SECRET is not defined');
    }
    return await bcrypt.compare(BCRYPT_SECRET + plainPassword, hashedPassword);
}