import * as crypto from "crypto";
class CryptoService {
    _hash: crypto.Hash;
    constructor(){
        this._hash = crypto.createHash("sha256");
    }

    getHash(str): string {
        return this._hash.update(str).digest('base64');
    }
}

export default new CryptoService();