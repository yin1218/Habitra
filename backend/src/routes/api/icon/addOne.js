import Icon from "../../../models/icon";

const addOneIcon = async (req, res) => {
    console.log("inside addOneIcon function");
    const myobj = new Icon(
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


export default addOneIcon;