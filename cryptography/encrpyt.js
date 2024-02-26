import crypto from "crypto";

function encryptWithPublicKey(publicKey,message){
    const bufferMessage = Buffer.from(message,'utf8');
    
    return crypto.publicEncrypt(publicKey,bufferMessage);
}

function encryptWithPrivateKey(privateKey,message){
    const bufferMessage = Buffer.from(message,'utf8');
   
    return crypto.privateEncrypt(privateKey,bufferMessage);
}

export {encryptWithPublicKey,encryptWithPrivateKey};
