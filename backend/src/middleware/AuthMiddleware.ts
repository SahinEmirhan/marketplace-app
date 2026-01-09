import jwt from "jsonwebtoken"


export function authMiddleware(req : any, res : any , next : any){
    const header = req?.headers.authorization;

    if(!header){
        return res.sendStatus(401);
    }

    const token = header.split(" ")[1];


    try{
        const ACCESS_SECRET = process.env.ACCESS_SECRET;
        const payload = jwt.verify(
            token,
            ACCESS_SECRET as string
        );

        req.email = payload;
        next();

    }catch(err){
        return res.status(401).json({
            message: "Token expired or invalid"
        });
    }


}