import { Request, Response } from "express";
import { MongoServiceT } from "../types/services/mongo_service";

export const ClientController = (mongo: MongoServiceT) => {
    const markPayment = (req: Request, res: Response) => {
        if (!(req.body.name)) {
            console.info("Attempt to mark a payment without name");
            res.status(400).send({message: "Malformed Request"});
            return;
        }
        mongo.markPaymentForClient(req.body.name).then(() => {
            console.log("Payments marked");
            res.status(200).send({message: "Success"});
        }).catch((err: Error) => {
            console.error(err);
            res.status(500).send({message: "Internal Server Error"});
        });
    };

    const retrieveClients = (req: Request, res: Response) => {
        mongo.retrieveClients().then((clients: any) => {
            res.status(200).send({message: "Success", data: clients});
        });
    };

    return {
        markPayment,
        retrieveClients,
    }
};
