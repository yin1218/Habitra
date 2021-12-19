import User from "../../../models/user";

const checkId = async(req, res) => {
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


export default checkId;