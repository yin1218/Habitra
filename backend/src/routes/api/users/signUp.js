import User from "../../../models/user";
import bcrypt from "bcrypt"; 




const saltRounds = 10;

const signUp = async (req, res) => {
    console.log("inside signUp function");
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    const myobj = new User(
        {
            User_ID: req.body.user_id,
            Name: req.body.name,
            Email: req.body.email,
            Password: hash,
            Avatar: req.body.avatar,
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


export default signUp;