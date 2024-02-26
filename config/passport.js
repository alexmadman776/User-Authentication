import passport from "passport";
import passportLocal from  "passport-local";
import User from "./database.js";
import { validPassword } from  "../lib/passportUtils.js";

const LocalStrategy = passportLocal.Strategy;

const verifyCallback = async (username,password,done)=>{
    try {
        const user = await User.findOne({username : username});
        if(!user) return done(null,false,"User Not Found");

            const isValid = validPassword(password,user.password,user.salt);
            if(isValid){
                return done(null,user);
            }else{
                return done(null,false,"Wrong password");
            }
        
    } catch (error) {
        return done(error,false);
    }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (userId,done)=>{
    try {
        const  user = await User.findById(userId);
        if(user){
            done(null,user);
        }
    } catch (error) {
        done(error);
        console.log(error.message);
    }
});