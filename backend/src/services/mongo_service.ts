import * as mongoose from "mongoose";
import { MONGO_CONNECTION_STRING } from "../config/constants";
import { MongoServiceT } from "../types/services/mongo_service";

export const MongoService = (() => {

    const mongo: MongoServiceT = {

    };
   const init =  () => {
       return mongoose.connect(MONGO_CONNECTION_STRING, {useNewUrlParser: true}).then(() => {
           console.log("Database connection established");
           return mongo;
       });
   };

   return {
       init,
   }
})();
