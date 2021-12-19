import Icon from "../../../models/icon";

const allIcon = async(req, res) => {
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


export default allIcon;