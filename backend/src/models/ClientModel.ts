import { Schema, model } from "mongoose";

const ClientSchema = new Schema({
    name: {type: String, unique: true},
    jobsTotal: {type: Number},
    pagesTotal: {type: Number},
    duePages: {type: Number},
});

export const ClientModel = model("Client", ClientSchema);
