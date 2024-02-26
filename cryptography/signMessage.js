import crypto from "crypto";
import fs from "fs";
import * as encrypt from "./encrpyt.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname  = dirname(fileURLToPath(import.meta.url));

const hash = crypto.createHash('sha256');

const myData = {
    name : "Manbendra Kumar",
    age : 21,
    socialSecurityNumber : "Never include such things because the data is not encrypted"
};
const myDataString = JSON.stringify(myData);

hash.update(myDataString);

const hashedData = hash.digest('hex');

const senderPrivateKey  = fs.readFileSync(__dirname + "/id_rsa_pri.pem",'utf8');
const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey,hashedData);


export const packageOfDataToBeSend = {
    algorithm : 'sha256',
    orginalData : myData,
    signedAndEncryptedMessage : signedMessage
};