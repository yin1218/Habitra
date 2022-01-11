import Participation from "../../models/participation";
import Task from "../../models/task";
import Record from "../../models/record";

const calculate_now_date = () =>{
    // Date object initialized as per Hong Kong timezone. Returns a datetime string
    let nz_date_string = new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });
    // Date object initialized from the above datetime string
    let date_nz = new Date(nz_date_string);
    // year as (YYYY) format
    let year = date_nz.getFullYear();
    // month as (MM) format
    let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
    // date as (DD) format
    let date = ("0" + date_nz.getDate()).slice(-2);
    // date as YYYY-MM-DDT00:00:00.000Z format
    let date_yyyy_mm_dd = year + "-" + month + "-" + date + "T00:00:00.000Z";
    console.log("Date in YYYY-MM-DDT00:00:00.000Z format: " + date_yyyy_mm_dd);
    return date_yyyy_mm_dd
}

export const addOneParticipation = async (req, res) => {
    console.log("inside addOneParticipation function");
    const myobj = new Participation(
        {
            Task_ID: req.body.task_id,
            User_ID: req.body.user_id,
            Is_Admin: false,
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
    
};

export const addOneAdmin = async (req, res) => {
    console.log("inside addOneAdmin function");
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

export const allParticipation_aAdmin = async(req, res) => {
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

export const allParticipation_aUser = async(req, res) => {
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

export const FinishParticipation_aUser = async(req, res) => {
    console.log("inside FinishParticipation_aUser function");
    var ongoingTask = [];
    
    Task.find({ Is_Closed: true })
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

export const OngoingParticipation_aUser = async(req, res) => {
    console.log("inside OngoingParticipation_aUser function");
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

export const TodayDayOffParticipation_aUser = async(req, res) => {
    console.log("inside TodayDayOffParticipation_aUser function");
    const today = calculate_now_date();
    const d = new Date(today);
    const dWeek = (d.getDay()+6)%7;
    var ongoingTask = [];
    var result = [];
    
    Task.find({ Is_Closed: false })
    .then(data => {
        console.log("Ongoing Task List:")
        console.log(data);
  
        data.map((d, k) => {
            ongoingTask.push(d._id);
        })

        Participation.find({ Task_ID: { $in: ongoingTask }, User_ID: req.query.user_id })
            .then(async (data) => {
                await Promise.all(
                    data.map(async (d, k) => {
                        const aTask = await Task.findOne({_id: d.Task_ID});
                        if(aTask.Working_Day[dWeek] == 0){
                            result.push(d.Task_ID);
                        }
                    })
                )

                console.log("Today User's dayoff task list:")
                console.log(result);
                res.status(200).send({ message: 'success', data: result});
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

export const TodayFinishParticipation_aUser = async(req, res) => {
    console.log("inside TodayFinishParticipation_aUser function");
    const today = calculate_now_date();
    const d = new Date(today);
    const dWeek = (d.getDay()+6)%7;
    var ongoingTask = [];
    var result = [];
    
    Task.find({ Is_Closed: false })
    .then(data => {
        console.log("Ongoing Task List:")
        console.log(data);
  
        data.map((d, k) => {
            ongoingTask.push(d._id);
        })

        Participation.find({ Task_ID: { $in: ongoingTask }, User_ID: req.query.user_id })
            .then(async (data) => {
                await Promise.all(
                    data.map(async (d, k) => {
                        const existing = await Record.findOne({Task_ID: d.Task_ID, Time: today, User_ID: req.query.user_id});
                        console.log("Task_ID: ", d.Task_ID, "\nUser_ID: ", req.query.user_id, "\n");
                        const aTask = await Task.findOne({_id: d.Task_ID});
                        if(aTask.Working_Day[dWeek] == 1){
                            if(existing){
                                if(aTask.Threshold <= existing.Frequency){
                                    result.push(d.Task_ID);
                                }
                            }
                        }
                    })
                )

                console.log("Today User's unfinished task list:")
                console.log(result);
                res.status(200).send({ message: 'success', data: result});
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

export const TodayOngoingParticipation_aUser = async(req, res) => {
    console.log("inside TodayOngoingParticipation_aUser function");
    const today = calculate_now_date();
    const d = new Date(today);
    const dWeek = (d.getDay()+6)%7;

    var ongoingTask = [];
    var result = [];
    
    Task.find({ Is_Closed: false })
    .then(data => {
        console.log("Ongoing Task List:")
        console.log(data);
  
        data.map((d, k) => {
            ongoingTask.push(d._id);
        })

        Participation.find({ Task_ID: { $in: ongoingTask }, User_ID: req.query.user_id })
            .then(async (data) => {
                await Promise.all(
                    data.map(async (d, k) => {
                        const existing = await Record.findOne({Task_ID: d.Task_ID, Time: today, User_ID: req.query.user_id});
                        console.log("Task_ID: ", d.Task_ID, "\nUser_ID: ", req.query.user_id, "\n");
                        const aTask = await Task.findOne({_id: d.Task_ID});
                        if(aTask.Working_Day[dWeek] == 1){
                            if(existing){
                                if(aTask.Threshold > existing.Frequency){
                                    result.push(d.Task_ID);
                                }
                            }
                            else{
                                result.push(d.Task_ID);
                            }
                        }
                    })
                )

                console.log("Today User's unfinished task list:")
                console.log(result);
                res.status(200).send({ message: 'success', data: result});
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

export const quitParticipation = async(req, res) => {
    console.log("inside quitParticipation function");
    try {
        const today = calculate_now_date();
        await Participation.updateOne({User_ID: req.body.user_id, Task_ID: req.body.task_id}, { $set: { 'Is_Quit': true, 'Quit_Time': today } });
        res.status(200).send({ message: 'success'});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const getQuitTime = async(req, res) => {
    console.log("inside getQuitTime function");
    try {
        const data = await Participation.findOne({User_ID: req.body.user_id, Task_ID: req.body.task_id}, {_id: 0, Is_Quit: 1, Quit_Time: 1});
        res.status(200).send({ message: 'success', data: data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const deleteUser = async(req, res) => {
    console.log("inside deleteUser function");
    try {
        await Record.deleteMany({User_ID: req.body.user_id, Task_ID: req.body.task_id});
        await Participation.deleteOne({User_ID: req.body.user_id, Task_ID: req.body.task_id});
        res.status(200).send({ message: 'success'});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};