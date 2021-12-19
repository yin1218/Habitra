import User from "../../../models/user";
import db from "../../../mongo";

const checkEmail = (req, res) => {
    console.log("inside checkEmail function");
    db.on("error", (err) => console.log(err));
    db.once("open", async () => {
      console.log("checking Email");
      const existing = await User.findOne({'Email': req.body.email});
      if(existing){
        var msg = 'existing';
        res.json({ message: msg });
      }
      else{
        var msg = 'not exist';
        res.json({ message: msg });
      }
    });
    
};


export default checkEmail;