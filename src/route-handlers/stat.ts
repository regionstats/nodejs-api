import {Request, Response} from "express";
import  DatabaseService  from '../services/database.service';
import  IpfsService  from '../services/ipfs.service';
import  CryptoService  from '../services/crypto.service';
import { validateStat } from "@regionstats/validator";
import { Stat } from "@regionstats/models";
import { AddStatRequest } from "@regionstats/models";
import { StatEntity } from "../models/stat-entity";

export async function AddStat(req: Request, res: Response) { 
    let request = <AddStatRequest>req.body  ;        
    let errorMessage = validateRequest(request);
    if (errorMessage){
        res.status(400).send(errorMessage);
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

async function validateRequest(request: AddStatRequest){
    if (request.hasOwnProperty("name")){
        if (typeof request.name != "string"){
            return "name must be a string";
        }
        if (request.name.length > 50){
            return "name must be under 50 characters";
        }
    }
    if (request.hasOwnProperty("tripcodeKey")){
        if (typeof request.tripcodeKey != "string"){
            return "tripcodeKey must be a string";
        }
        if (request.tripcodeKey.length > 256){
            return "tripcodeKey must be under 256 characters";
        }
    }
    if (request.hasOwnProperty("category")){
        if (typeof request.category != "string"){
            return "category must be a string";
        }
        if (request.category.length > 30){
            return "tripcodeKey must be under 30 characters";
        }
    }
    if (!request.hasOwnProperty("stat")){
        return "missing stat property";
    }
    if (typeof request.stat != "object"){
        return "stat must be an object";
    }
    let result = await validateStat(request.stat);
    if (result){
        return "error with stat: " + result;
    }
}