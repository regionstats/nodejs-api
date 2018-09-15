import { MongoClient, Db } from "mongodb";
import { StatEntity } from "../models/stat-entity";
import config from '../config';

class DatabaseService {
    private _db: Db 
    constructor(){
        var dbConf = config.mongodb;
        var url = `mongodb://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db}`;
        MongoClient.connect(url, (err, client)=> {
            this._db = client.db(dbConf.db);
        })
    }
    addStat(statEntity: StatEntity){
        this._db.collection("stats").insertOne(statEntity);
    }
}

export default new DatabaseService();