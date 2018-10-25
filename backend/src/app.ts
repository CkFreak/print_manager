import * as express from "express";
import * as cors from "cors";
import {Server} from "http";
import { MongoServiceT } from "./types/services/mongo_service";

export const App = (mongo: MongoServiceT) => {
  const app = express();
  let server: Server;

  app.use(cors());

  const listen = (port: number) => {
          server = app.listen(port, (err: Error) => {
              if (err) {
                  return Promise.reject(err);
              }
              return Promise.resolve();
          });
  };

  const shutdown = () => {
      server.close((err: Error) => {
          if (err) {
              return Promise.reject("Shutdown Failed");
          }
          return Promise.resolve();
      })
  };

  return {
      listen,
      shutdown,
  }
};
