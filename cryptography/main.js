import * as encrpyt from "./encrpyt.js";
import * as decrypt from "./decrypt.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname  = dirname(fileURLToPath(import.meta.url));

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem",'utf8');
const privateKey = fs.readFileSync(__dirname + "/id_rsa_pri.pem",'utf8');

const message = "I am Batman";
const encrpytedMessage = encrpyt.encryptWithPrivateKey(privateKey,message)

console.log(encrpytedMessage.toString());

const decrpytedMessage = decrypt.decryptWithPublicKey(privateKey,encrpytedMessage);

console.log(decrpytedMessage.toString());