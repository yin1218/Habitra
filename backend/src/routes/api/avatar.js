import Avatar from "../../models/avatar";

export const addOneAvatar = async (req, res) => {
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

export const allAvatar = async(req, res) => {
    console.log("inside allAvatar function");
    try {
        const Data = await Avatar.find();
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const AvatarByClass = async(req, res) => {
    console.log("inside AvatarByClass function");
    try {
        const Data = await Avatar.find({'Class': req.query.className});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
    
};

export const oneAvatar = async(req, res) => {
    console.log("inside oneAvatar function");
    try {
        const Data = await Avatar.findOne({'_id': req.query.avatar_id});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};