import crypto from "crypto";//crypto library from native node 
import fs from "fs"; //imports the file system
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname  = dirname(fileURLToPath(import.meta.url));

function genKeyPair(){
//Genrates a object where the keys are stored in the properties 'privateKey' and 'publicKey'
const keyPair = crypto.generateKeyPairSync('rsa',{
    modulusLength : 4096, //bits-standard for 'RSA Keys'

    publicKeyEncoding :{
        type :'pkcs1',   //Public key cryptography Standards 1
        format : 'pem'   //Most common formmating choice
    },
    privateKeyEncoding : {
        type :'pkcs1',  //Public key cryptography Standards 1
        format : 'pem'  //Most common formmating choice
    }

})

fs.writeFileSync(__dirname + "/id_rsa_pub.pem",keyPair.publicKey);
fs.writeFileSync(__dirname + "/id_rsa_pri.pem",keyPair.privateKey);
}

genKeyPair();