import User from "../../../models/user";
import bcrypt from "bcrypt";  
const jwt = require("jsonwebtoken");
import dotenv from "dotenv-defaults";
dotenv.config();


const login = async(req, res) => {
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


export default login;