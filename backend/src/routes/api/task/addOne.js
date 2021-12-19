import Task from "../../../models/task";

const addOneTask = async (req, res) => {
    console.log("inside addOneTask function");
    const myobj = new Task(
        {
            Title: req.body.title,
            Description: req.body.description,
            Threshold: req.body.threshold,
            Working_Day: req.body.working_day,
            Punish: req.body.punish,
            Need_Daily_Desc: req.body.need_daily_desc,
            Icon: req.body.icon,
            Start_Hour: req.body.start_hour,
            End_Hour: req.body.end_hour
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


export default addOneTask;