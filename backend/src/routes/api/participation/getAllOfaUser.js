import Participation from "../../../models/participation";

const allParticipation_aUser = async(req, res) => {
    console.log("inside allParticipation_aUser function");
    try {
        const Data = await Participation.find({'User_ID': req.query.user_id}, {_id: 0, __v: 0, User_ID: 0, Last_Calculate_Day: 0});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};


export default allParticipation_aUser;