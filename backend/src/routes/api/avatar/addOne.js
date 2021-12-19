import Avatar from "../../../models/avatar";

const addOneAvatar = async (req, res) => {
    console.log("inside addOneAvatar function");
    const myobj = new Avatar(
        {
            Uid: req.body.uid,
            Class: req.body.class,
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


export default addOneAvatar;