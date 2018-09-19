import * as express from "express";
import * as bodyParser from "body-parser";
import { AddStat } from './route-handlers/stat';
import config from './config';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json()); 
        this.app.use(this.allowCors);
        this.app.route('/stat').post(AddStat);

        this.app.listen(config.port, () => {
            console.log('server listening on port ' + config.port);
        })
    }

    allowCors(req: express.Request, res:express.Response, next: express.NextFunction) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    } 
}

export default new App().app;