import { MongoService } from "./services/mongo_service";
import { App } from "./app";
import { ClientUpdateService } from "./services/ClientUpdateService";
import * as schedule from "node-schedule";
import { PORT } from "./config/constants";

const start = async () => {
    let clientUpdateService;
    MongoService.init().then((mongo) => {
        clientUpdateService = ClientUpdateService(mongo);
        clientUpdateService.updateDatabase();
        console.info("Scheduling Email Job for 12:02 on every 25th of the year");
        schedule.scheduleJob("* 2 12 25 * *", clientUpdateService.updateDatabase);
        const app = App(mongo);
        app.listen(PORT);
    });
};

start().then(() => {
    console.log(`Server started! Listening on Port ${PORT}.`);
});
