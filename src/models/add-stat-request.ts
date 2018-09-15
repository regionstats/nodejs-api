import { Stat } from "@regionstats/models";

export class AddStatRequest {
    name: string;
    tripcodeKey: string;
    category: string;
    stat: Stat;

    static validate(request: AddStatRequest){
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
    }
}