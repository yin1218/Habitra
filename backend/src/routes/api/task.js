import Participation from "../../models/participation";
import Record from "../../models/record";
import Task from "../../models/task";

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

export const addOneTask = async (req, res) => {
    console.log("inside addOneTask function");
    const today = calculate_now_date();
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
            End_Hour: req.body.end_hour,
            Close_Time: null,
            Is_Closed: false,
            Account_Day: today
        }
    ) 
    console.log(myobj)
    try{
        const aTask = await myobj.save();
        res.status(200).send({ message: 'success', id: aTask.id});
    }
    catch(err){
        res.status(403).send({ message: 'error', err_msg: err});
    }
    
};

export const oneTask = async(req, res) => {
    console.log("inside oneTask function");
    if(req.query.task_id == null ){
        res.status(403).send({ message: 'task_id input is needed'});
        return ;
    }
   
    try {
        const Data = await Task.findOne({'_id': req.query.task_id});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const oneTaskPartOF = async(req, res) => {
    console.log("inside oneTaskPartOF function");
    if(req.query.task_id == null ){
        res.status(403).send({ message: 'task_id input is needed'});
        return ;
    }
    try {
        const Data = await Task.findOne({'_id': req.query.task_id}, {_id:0, __v:0, Is_Closed:0, Working_Day:0, Punish:0, Account_Day:0, Need_Daily_Desc:0, updatedAt:0});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const closeTask = async(req, res) => {
    console.log("inside closeTask function");
    if(req.body.task_id == null ){
        res.status(403).send({ message: 'task_id input is needed'});
        return ;
    }
    const today = calculate_now_date();
    try {
        await Task.updateOne({'_id': req.body.task_id}, { $set: { 'Is_Closed': true , 'Close_Time': today} });
        res.status(200).send({ message: 'success'});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const openTask = async(req, res) => {
    console.log("inside closeTask function");
    if(req.body.task_id == null ){
        res.status(403).send({ message: 'task_id input is needed'});
        return ;
    }
    try {
        await Task.updateOne({'_id': req.body.task_id}, { $set: { 'Is_Closed': false } });
        res.status(200).send({ message: 'success'});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const deleteTask = async(req, res) => {
    console.log("inside deleteTask function");
    if(req.body.task_id == null ){
        res.status(403).send({ message: 'task_id input is needed'});
        return ;
    }
    try {
        await Task.deleteOne({"_id": req.body.task_id});
        await Record.deleteMany({"Task_ID": req.body.task_id});
        await Participation.deleteOne({"Task_ID": req.body.task_id});
        res.status(200).send({ message: 'success'});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const clearMoney = async(req, res) => {
    console.log("inside clearMoney function");
    if(req.body.task_id == null ){
        res.status(403).send({ message: 'task_id input is needed'});
        return ;
    }
    const today = calculate_now_date();
    try {
        await Participation.updateMany({Task_ID: req.body.task_id}, { $set: { 'Punish_Sum': 0 }});
        await Task.updateOne({_id: req.body.task_id}, { $set: { 'Account_Day': today }});
        res.status(200).send({ message: 'success'});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};