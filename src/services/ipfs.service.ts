import * as IPFS from "ipfs";

class IpfsService {
    private _node: any 
    constructor(){
        this._node = new IPFS();
    }
    addObject(obj: any): Promise<string>{
        return this._node.files.add({
            content: Buffer.from(JSON.stringify(obj))
        }).then(result => result[0].hash);
    }
}

export default new IpfsService();