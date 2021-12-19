import Avatar from "../../../models/avatar";

const oneAvatar = async(req, res) => {
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


export default oneAvatar;