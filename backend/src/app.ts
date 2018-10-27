import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Server } from "http";
import { MongoServiceT } from "./types/services/mongo_service";
import { UserController } from "./controller/UserController";
import { LoginStatusMiddleware } from "./middleware/login_status_middleware";

export const App = (mongo: MongoServiceT) => {
    const app = express();
    let server: Server;
    const loginMiddleware = LoginStatusMiddleware();
    const userController = UserController(mongo);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());

    app.post("/register", userController.registerUser);

    app.use(loginMiddleware.isTokenValid);

    app.post("/login", userController.loginUser);

    app.all("*", (req: express.Request, res: express.Response) => {
        console.log("Route could not be found %s", req.url);
        res.status(404).send({message: "Not Found!"});
    });

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
