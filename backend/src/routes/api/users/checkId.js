import User from "../../../models/user";
import db from "../../../mongo";

const checkId = (req, res) => {
    console.log("inside checkId function");
    db.on("error", (err) => console.log(err));
    db.once("open", async () => {
      console.log("checking ID");
      const existing = await User.findOne({'User_ID': req.body.user_id});
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


export default checkId;