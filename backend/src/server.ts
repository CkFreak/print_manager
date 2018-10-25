import { MongoService } from "./services/mongo_service";
import { App } from "./app";
import { PORT } from "./config/constants";
import { ImapService } from "./types/services/imap_service";

const start = async () => {
    MongoService.init().then((mongo) => {
        const app = App(mongo);
        app.listen(PORT);
        ImapService.startService();
    });
};

start().then(() => {
    console.log(`Server started! Listening on Port ${PORT}.`);
});
