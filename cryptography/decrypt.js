import crypto from "crypto";

function decryptWithPrivateKey(privateKey,encrpytedMessage){
    
    return crypto.privateDecrypt(privateKey,encrpytedMessage);
}

function decryptWithPublicKey(publicKey,encrpytedMessage){

    return crypto.publicDecrypt(publicKey,encrpytedMessage);
}

export {decryptWithPrivateKey,decryptWithPublicKey};