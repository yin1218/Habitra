import Icon from "../../models/icon";

export const addOneIcon = async (req, res) => {
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

export const allIcon = async(req, res) => {
    console.log("inside allIcon function");
    try {
        const Data = await Icon.find();
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const oneIcon = async(req, res) => {
    console.log("inside oneIcon function");
    try {
        const Data = await Icon.findOne({'_id': req.query.icon_id});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};