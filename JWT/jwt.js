import jwt from "jsonwebtoken";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { error } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));
const privateKey = fs.readFileSync(__dirname + "/id_rsa_pri.pem",'utf8');
const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem",'utf8');

const payloadObj ={
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  }

  const signedJWT = jwt.sign(payloadObj,privateKey,{algorithm : 'RS256'});

  console.log(signedJWT);

  jwt.verify(signedJWT,publicKey,{algorithms : ['RS256']},(error,payload)=>{
    if(error){
        console.log(error);
    }else{
        console.log(payload);
    }
  })
