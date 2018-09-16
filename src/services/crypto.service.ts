import * as crypto from "crypto";
class CryptoService {
    getHash(str): string {
        return crypto.createHash("sha256").update(str).digest('base64');
    }
}

export default new CryptoService();