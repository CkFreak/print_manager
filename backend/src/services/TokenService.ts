import * as jsonwebtoken from "jsonwebtoken";
import * as bluebird from "bluebird";
import { LOGIN_SECRET } from "../config/constants";

export const TokenService =  () => {

    const jwt: any = bluebird.promisifyAll(jsonwebtoken);

    const signLoginToken = (name: string) => {
        return jwt.signAsync({name}, LOGIN_SECRET, {expiresIn: "1h"}).then((token: string) => {
            if (token) return token;
        }).catch((err: Error): any => {
            console.error(err);
            return undefined;
        });
    };

    return {
        signLoginToken,
    }
};
