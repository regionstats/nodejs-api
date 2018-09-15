import {Request, Response} from "express";
import  DatabaseService  from '../services/database.service';
import  IpfsService  from '../services/ipfs.service';
import  CryptoService  from '../services/crypto.service';
import { validateStat } from "@regionstats/validator";
import { Stat } from "@regionstats/models";
import { AddStatRequest } from "../models/add-stat-request";
import { StatEntity } from "../models/stat-entity";

export async function AddStat(req: Request, res: Response) { 
    let request = <AddStatRequest>req.body  ;        
    let errorMessage = validateStat(request.stat) || AddStatRequest.validate(request);
    if (errorMessage){
        res.status(400).send({
            "error": errorMessage
        });
        return;
    } 
    Stat.clean(request.stat);
    let hash = await IpfsService.addObject(request.stat);
    let statEntity: StatEntity = Object.assign(request.stat, {
        _hash: hash,
        _date: new Date(),
        _name: request.name,
        _tripcode: request.tripcodeKey && CryptoService.getHash(request.tripcodeKey),
        _category: request.category
    });
    StatEntity.clean(statEntity);
    DatabaseService.addStat(statEntity);
    res.status(200).send(statEntity._hash);
}