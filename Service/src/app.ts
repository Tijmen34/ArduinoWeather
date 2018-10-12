import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/dataRoutes";

class App {

    public app: express.Application;
    public routeSensors: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routeSensors.routes(this.app);
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;
