import Icon from "../../../models/icon";

const oneIcon = async(req, res) => {
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


export default oneIcon;