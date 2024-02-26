import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import ejs from "ejs";
import User from "./config/database.js"
import {genPassword} from "./lib/passportUtils.js";
import "./config/passport.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost/userDB").then(() => console.log('Database Connected!'));


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store : MongoStore.create({
    mongoUrl: "mongodb://localhost/userDB",
    collectionName : "sessions"
  }),
}));

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/register", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/secrets",(req,res)=>{
  if(req.isAuthenticated()){
    res.send('<h1> You have succesfully accesed the secrets page</h1> <a href ="/log-out">Log Out</a>');
  }else{
    res.send('<h1> You are Logged Out Please Login again </h1> <a href ="/login">LogIn</a>');
  }

});

app.get("/log-out",async(req,res)=>{

      req.logout(function(err){
      if (err) { return next(err); }
      res.redirect('/secrets')
    });

})

app.post("/register", async (req, res) => {
    const genhash = genPassword(req.body.password);

    const newUser = {
      name : req.body.name,
      username : req.body.username,
      password : genhash.hash,
      salt : genhash.salt
    }

    try {
      const user = await User.create(newUser);
      console.log(user);
      res.redirect("/login");
    } catch (error) {
      console.log(error.message);
    }
});

app.post("/login", passport.authenticate('local',{successRedirect : "/success-route", failureRedirect: "/failure-route"
,failureMessage:true}),(req,res)=>{
    console.log("User Authorised");
    res.send("<h1> Hello you are Authenticated</h1>")
});

app.get("/success-route",(req,res)=>{
  res.send('<h1> You have been succesfully authenticated </h1> <a href ="/secrets">Secrets route</a>');
});

app.get("/failure-route",(req,res)=>{
  res.send("authentication failed due to some reason");
});


app.listen(port, (req, res) => {
  console.log("Server is up and running at port " + port);
});
