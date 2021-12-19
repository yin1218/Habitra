import User from "../../../models/user";
import bcrypt from "bcrypt";  


const login = async(req, res) => {
    console.log("inside login function");
    const user = await User.findOne({User_ID: req.body.user_id});

    if(user){
        const cmp = await bcrypt.compare(req.body.password, user.Password);
        if (cmp) {
            res.status(200).send({
                user_id: user.User_ID,
                name: user.Name,
                email: user.Email,
                avatar: user.Avatar
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