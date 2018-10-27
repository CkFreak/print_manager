import * as mongoose from "mongoose";
import { MONGO_CONNECTION_STRING } from "../config/constants";
import { MongoServiceT } from "../types/services/mongo_service";
import { UserModel } from "../models/UserModel";

export const MongoService = (() => {

    const registerUser = (name: string, password: string): Promise<any> => {
        return UserModel.update({name: name},
            {name: name, password: password},
            {upsert: true})
            .exec();
    };

    const getUserByName = (name: string): Promise<any> => {
        return UserModel.findOne({name: name}).exec();
    };

    const mongo: MongoServiceT = {
        registerUser,
        getUserByName,
    };

    const init = () => {
        return mongoose.connect(MONGO_CONNECTION_STRING, {useNewUrlParser: true}).then(() => {
            console.log("Database connection established");
            return mongo;
        });
    };

    return {
        init,
    }
})();
