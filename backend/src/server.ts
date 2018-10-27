import { MongoService } from "./services/mongo_service";
import { App } from "./app";
import { PORT } from "./config/constants";

const start = async () => {
    MongoService.init().then((mongo) => {
        const app = App(mongo);
        app.listen(PORT);
    });
};

start().then(() => {
    console.log(`Server started! Listening on Port ${PORT}.`);
});
