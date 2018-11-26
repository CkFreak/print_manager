import { MongoService } from "./services/mongo_service";
import * as mongoose from "mongoose";
import { App } from "./app";
import { ClientUpdateService } from "./services/ClientUpdateService";
import * as cron from "cron";
import { PORT } from "./config/constants";

let app: any = {};

const start = async () => {
    let clientUpdateService;
    MongoService.init().then((mongo) => {
        clientUpdateService = ClientUpdateService(mongo);
        clientUpdateService.updateDatabase();
        console.info("Scheduling Email Job for 13:02 on every 25th of the month.");
        new cron.CronJob("* 2 13 25 * *", clientUpdateService.updateDatabase, null, true, "CET");
        app = App(mongo);
        app.listen(PORT);
    });
};

start().then(() => {
    console.log(`Server started! Listening on Port ${PORT}.`);
    process.on("exit", () => {
        console.info("Shutting down gracefully");
        app.shutdown();
        mongoose.connection.close().then(() => {
            console.log("Database connection closed.");
            process.exit(0);
        }).catch((err: Error) => {
            console.error(err);
            process.exit(-1);
        });
    });
    process.on("SIGINT", () => {
        console.info("Shutting down gracefully");
        app.shutdown();
        mongoose.connection.close().then(() => {
            console.log("Database connection closed.");
            process.exit(0);
        }).catch((err: Error) => {
            console.error(err);
            process.exit(-1);
        });
    });
    process.on("uncaughtException", (e: Error) => {
        console.log(e.stack);
        console.info("Server crashed because of an unknown exception");
    });
});
