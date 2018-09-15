import * as express from "express";
import * as bodyParser from "body-parser";
import { AddStat } from './route-handlers/stat';
import config from './config';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json()); 
        this.app.route('/stat').post(AddStat);

        this.app.listen(config.port, () => {
            console.log('server listening on port ' + config.port);
        })
    }
}

export default new App().app;