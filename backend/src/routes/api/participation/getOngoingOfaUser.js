import Participation from "../../../models/participation";
import Task from "../../../models/task";

const OngoingParticipation_aUser = async(req, res) => {
    console.log("inside allParticipation_aUser function");
    var ongoingTask = [];
    
    Task.find({ Is_Closed: false })
    .then(data => {
        // console.log("Ongoing Task List:")
        // console.log(data);
  
        data.map((d, k) => {
            ongoingTask.push(d._id);
        })

        Participation.find({ Task_ID: { $in: ongoingTask }, Is_Admin: false, User_ID: req.query.user_id }, {_id: 0, __v: 0, User_ID: 0, Is_Admin: 0, Is_Quit: 0, Quit_Time: 0, Punish_Sum: 0, Last_Calculate_Day: 0})
            .then(data => {
                console.log("User's ongoing task list:")
                console.log(data);
                res.status(200).send({ message: 'success', data: data});
            })
            .catch(error => {
                console.log(error);
                res.status(403).send({ message: 'error', data: null});
                throw new Error("Database query failed"); 
            })
    })
    .catch(error => {
        console.log(error);
    })
};


export default OngoingParticipation_aUser;