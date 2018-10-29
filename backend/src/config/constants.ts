import * as result from "dotenv";

result.config();

export const PORT = process.env.PORT;
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
export const CH_DRUCK_PW = process.env.CH_DRUCK_PW;
export const LOGIN_SECRET = process.env.LOGIN_SECRET;
