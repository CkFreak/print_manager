import { Request, Response } from "express";
import * as jsonwebtoken from "jsonwebtoken";
import * as bluebird from "bluebird";
import { LOGIN_SECRET } from "../config/constants";

export const LoginStatusMiddleware = () => {

    const jwt: any = bluebird.promisifyAll(jsonwebtoken);

    const isTokenValid = (req: Request, res: Response, next: Function) => {
        const token = req.get("jwt");
        jwt.verifyAsync(token, LOGIN_SECRET).then((decoded: string) => {
            if (decoded) {
                console.log(decoded);
                next();
            }
        }).catch((err: Error) => {
            console.log(err);
            res.status(401).send({message: "You are not allowed here."});
            return;
        });
    };

    return {
        isTokenValid,
    };
};
