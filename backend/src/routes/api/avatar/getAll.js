import Avatar from "../../../models/avatar";

const allAvatar = async(req, res) => {
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


export default allAvatar;