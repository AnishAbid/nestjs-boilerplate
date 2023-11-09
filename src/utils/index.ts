import { createCipheriv, createDecipheriv,
      scrypt, pbkdf2Sync } from 'crypto';
import { promisify } from 'util';
import {Crypto_keys} from '../constants'
const iv = Crypto_keys.IV
const secret = Crypto_keys.SECRET
const salt = Crypto_keys.SALT
class Utils{
    constructor(){}
    async encrypt(string){
        // The key length is dependent on the algorithm.
        // In this case for aes256, it is 32 bytes.
        const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const encryptedText = Buffer.concat([
          cipher.update(string),
          cipher.final(),
        ]);
        return encryptedText
    }
    decrypt(string,key){
        const decipher = createDecipheriv('aes-256-ctr', key, iv);
        const decryptedText = Buffer.concat([
          decipher.update(string),
          decipher.final(),
        ]);
    }
    generateHash(password){
        const hash = pbkdf2Sync(password, salt, 10, 256, 'sha256').toString();
        return hash
    }
    compaireHash(password,hashPass){
        const hash = pbkdf2Sync(password, salt, 10, 256, 'sha256').toString();
        if(hashPass === hash)return true
        else return false
    }
    generateOtp() {
          return Math.floor(Math.random() * 100000).toString().padStart(6, '0')
      }
}
export default new Utils()