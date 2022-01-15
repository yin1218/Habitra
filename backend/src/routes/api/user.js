import User from "../../models/user";
import bcrypt from "bcrypt";  
const jwt = require("jsonwebtoken");
import dotenv from "dotenv-defaults";
import Participation from "../../models/participation";
dotenv.config();

const saltRounds = 10;

export const signUp = async (req, res) => {
    console.log("inside signUp function");
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    const myobj = new User(
        {
            User_ID: req.body.user_id,
            Name: req.body.name,
            Email: req.body.email,
            Password: hash,
            Avatar: req.body.avatar,
            Token: null
        }
    ) 
    console.log(myobj)
    try{
        await myobj.save();
        res.status(200).send({ message: 'success'});
    }
    catch(err){
        res.status(403).send({ message: 'error', err_msg: err});
    }
};

export const checkEmail = async(req, res) => {
    console.log("inside checkEmail function");
    const existing = await User.findOne({'Email': req.body.email});
    if(existing){
        var msg = 'existing';
        res.json({ message: msg });
    }
    else{
        var msg = 'not exist';
        res.json({ message: msg });
    }
    
};

export const checkId = async(req, res) => {
    console.log("inside checkId function");
    const existing = await User.findOne({'User_ID': req.body.user_id});
    if(existing){
        var msg = 'existing';
        res.json({ message: msg });
    }
    else{
        var msg = 'not exist';
        res.json({ message: msg });
    }
    
};

export const login = async(req, res) => {
    console.log("inside login function");
    const user = await User.findOne({User_ID: req.body.user_id});

    if(user){
        const cmp = await bcrypt.compare(req.body.password, user.Password);
        if (cmp) {
            const email = user.Email;
            const token = jwt.sign(
                { User_ID: user.User_ID, email},
                process.env.JWTPRIVATEKEY,
                {
                  expiresIn: "2h",
                }
              );
            user.Token = token;
            await User.updateOne({User_ID: req.body.user_id}, { $set: { 'Token': token } });
            res.cookie('token', user.Token, {httpOnly: true});
            res.status(200).send({
                userId: user.User_ID,
                name: user.Name,
                email: user.Email,
                avatar: user.Avatar,
                token: user.Token
            });
        } 
        else {
            return res.status(401).send({ message: "Invalid Password!" });
        }
    }
    else {
        return res.status(404).send({ message: "User Not found." });
    }
};

export const oneUser = async(req, res) => {
    console.log("inside oneUser function");
    const user = await User.findOne({User_ID: req.query.user_id});
    if(user){
        try {
            const Data = await User.findOne({'User_ID': req.query.user_id}, {_id: 0, __v:0, Password: 0, Token: 0});
            console.log("Data: ",Data);
            res.status(200).send({ message: 'success', data: Data});
        } catch (e) { 
            res.status(403).send({ message: 'error', data: null});
            throw new Error("Database query failed"); 
        }
    }
    else {
        return res.status(404).send({ message: "User Not found." });
    }
};

export const checkUserExist = async(req, res) => {
    console.log("inside checkUserExist function");
    if(req.query.user_id == null ){
        res.status(403).send({ message: 'user_id input is needed'});
        return ;
    }
    else if(req.query.task_id == null ){
        res.status(403).send({ message: 'task_id input is needed'});
        return ;
    }
    const user = await User.findOne({User_ID: req.query.user_id});
    if(user){
        const participation = await Participation.findOne({User_ID: req.query.user_id, Task_ID: req.query.task_id, Is_Quit: false});
        if(participation){
            res.status(200).send({ message: 'User already in this Task', data: false});
        }
        else{
            res.status(200).send({ message: 'User Not in this Task', data: true});
        }
    }
    else {
        return res.status(200).send({ message: "User Not found.", data: false });
    }
}