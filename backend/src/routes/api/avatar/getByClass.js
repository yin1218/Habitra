import Avatar from "../../../models/avatar";

const AvatarByClass = async(req, res) => {
    console.log("inside AvatarByClass function");
    try {
        const Data = await Avatar.find({'Class': req.query.class});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
    
};


export default AvatarByClass;