import Participation from "../../../models/participation";

const addOneAdmin = async (req, res) => {
    console.log("inside addOneParticipation function");
    const existing = await Participation.findOne({User_ID: req.body.user_id, Task_ID: req.body.task_id});
    if(existing){ // update Is_Admin = true
        try{
            await Participation.updateOne({User_ID: req.body.user_id, Task_ID: req.body.task_id}, { $set: { 'Is_Admin': true } });
            res.status(200).send({ message: 'success'});
        }
        catch(err){
            res.status(403).send({ message: 'error', err_msg: err});
        }
    }
    else{ // add a new participation
        const myobj = new Participation(
            {
                Task_ID: req.body.task_id,
                User_ID: req.body.user_id,
                Is_Admin: true,
                Is_Quit: false,
                Quit_Time: null,
                Punish_Sum: 0,
                Last_Calculate_Day: null
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
    }
};


export default addOneAdmin;