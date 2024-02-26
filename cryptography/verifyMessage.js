import crypto from "crypto";
import fs from 'fs';
import * as decrypt from './decrypt.js';
import {packageOfDataToBeSend} from './signMessage.js';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname  = dirname(fileURLToPath(import.meta.url));

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem",'utf8');
const hash = crypto.createHash(packageOfDataToBeSend.algorithm);

hash.update(JSON.stringify(packageOfDataToBeSend.orginalData));

const hashedData = hash.digest('hex');

const decrpytedMessage = decrypt.decryptWithPublicKey(publicKey,packageOfDataToBeSend.signedAndEncryptedMessage);

const decrpytedSignedMessage = decrpytedMessage.toString();

if(hashedData === decrpytedSignedMessage){
    console.log("Data is not tampered and signed by the sender");
}else{
    console.log("Data is tampered ");
}

