import Participation from "../../../models/participation";

const allParticipation_aAdmin = async(req, res) => {
    console.log("inside allParticipation_aAdmin function");
    try {
        const Data = await Participation.find({'User_ID': req.query.user_id, 'Is_Admin': true}, {_id: 0, __v: 0, User_ID: 0, Is_Admin: 0, Is_Quit: 0, Quit_Time: 0, Punish_Sum: 0, Last_Calculate_Day: 0});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};


export default allParticipation_aAdmin;