import { Request, Response } from "express";
import { MongoServiceT } from "../types/services/mongo_service";
import * as bluebird from "bluebird";
import * as Bcrypt from "bcrypt";
import { TokenService } from "../services/TokenService";

export const UserController = (mongo: MongoServiceT) => {

    const SALT_ROUNDS = 15;
    const bcrypt: any = bluebird.promisifyAll(Bcrypt);
    const tokenService = TokenService();

    const registerUser = (req: Request, res: Response) => {
        if (!(req.body.name && req.body.password)) {
            console.info("There was an attempt to register with incorrect parameters!");
            res.status(400).send({message: "Malformed Request"});
            return;
        }
        bcrypt.hashAsync(req.body.password, SALT_ROUNDS).then((hash: string) => {
            return mongo.registerUser(req.body.name, hash);
        }).then(() => {
            console.log(`User ${req.body.name} was successfully registered!`);
            res.status(200).send({message: "Success"});
        }).catch((err: Error) => {
            console.error(err);
            res.status(500).send({message: "Internal Server Error"});
        });
    };

    const loginUser = (req: Request, res: Response) => {
        let sent = false;
        if (!(req.body.name && req.body.password)) {
            console.info("There was an attempt to login with incorrect parameters!");
            res.status(400).send({message: "Malformed Request"});
            return;
        }
        mongo.getUserByName(req.body.name).then((user: any) => {
            return bcrypt.compareAsync(req.body.password, user.password);
        }).then((result: boolean) => {
            if (result) {
                return tokenService.signLoginToken(req.body.name);
            }
            sent = true;
            return res.status(404).send({message: "User or password incorrect"});
        }).then((token: any) => {
            if (token) {
                return res.status(200).send({message: "Success", data: token});
            } else if (!sent) {
                console.error("Token signing failed on login");
                res.status(500).send({message: "Internal Server Error"});
            }
        }).catch((err: Error) => {
            console.error(err);
            res.status(500).send({message: "Internal Server Error"});
        });
    };

    return {
        registerUser,
        loginUser,
    }
};
