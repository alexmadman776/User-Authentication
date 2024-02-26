import crypto from "crypto";


const genPassword = (userPassword)=>{
    const salt = crypto.randomBytes(32).toString('hex');
    const genhash = crypto.pbkdf2Sync(userPassword,salt,1000,64,'sha512').toString('hex');

    return { 
        salt : salt,
        hash : genhash
    }
};

const validPassword = (userPassword,Password,salt)=>{
    const genhash = crypto.pbkdf2Sync(userPassword,salt,1000,64,'sha512').toString('hex');
    
    return  genhash == Password;
}

export {genPassword,validPassword};
