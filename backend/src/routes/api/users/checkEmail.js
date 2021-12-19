import User from "../../../models/user";

const checkEmail = async(req, res) => {
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


export default checkEmail;