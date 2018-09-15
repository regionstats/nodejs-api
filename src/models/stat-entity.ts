import { Stat } from "@regionstats/models";

export class StatEntity extends Stat {
    _hash: string;
    _date: Date;
    _name?: string
    _tripcode?: string;
    _category?: string;
    static clean(statEntity: StatEntity) {
        if (!statEntity._name){
            delete statEntity._name;
        }
        if (!statEntity._tripcode){
            delete statEntity._tripcode;
        }
        if (!statEntity._category){
            delete statEntity._category;
        }
    }
}