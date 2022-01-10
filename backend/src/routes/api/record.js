import Record from "../../models/record";
import Participation from "../../models/participation";
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

export const addOneRecord = async (req, res) => {
    const today = calculate_now_date();
    console.log("inside addOneRecord function");

    const existing = await Record.findOne({User_ID: req.body.user_id, Task_ID: req.body.task_id, Time: today});
    if(existing){ // update Is_Admin = true
        try{
            await Record.updateOne({User_ID: req.body.user_id, Task_ID: req.body.task_id, Time: today}, { $set: { 'Frequency': existing.Frequency+1 } });
            res.status(200).send({ message: 'success'});
        }
        catch(err){
            res.status(403).send({ message: 'error', err_msg: err});
        }
    }
    else{
        const myobj = new Record(
            {
                Task_ID: req.body.task_id,
                User_ID: req.body.user_id,
                Time: today,
                Frequency: 1,
                Daily_Desc: req.body.daily_desc
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
    }
    
};

export const oneRecordOfADay = async(req, res) => {
    console.log("inside oneRecordOfADay function");
    try {
        var result = Object();
        const Data = await Record.findOne({'User_ID': req.query.user_id, 'Task_ID': req.query.task_id, 'Time': req.query.time}, {Daily_Desc: 1, Frequency: 1, _id: 0});
        console.log("Data: ",Data);
        if(Data){
            res.status(200).send({ message: 'success', data: Data});
        }
        else{
            result['Frequency'] = 0 ;
            result['Daily_Desc'] = null;
            res.status(200).send({ message: 'success', data: result});
        }
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const RecordsOfAPeriod = async(req, res) => {
    console.log("inside RecordsOfAPeriod function");
    try {
        const Data = await Record.find({'User_ID': req.query.user_id, 'Task_ID': req.query.task_id, 'Time': {$gte: req.query.start_time, $lte: req.query.end_time}}, {_id: 0, __v: 0, User_ID: 0, Task_ID: 0});
        var frequency_arr = [];
        var daily_desc_arr = [];
        var end_date = new Date(req.query.end_time);
        
        
        for ( let cur_date = new Date(req.query.start_time); cur_date.getDate() <= end_date.getDate() ; cur_date.setDate(cur_date.getDate() + 1)){
            var d = Data.filter(function(item, index, array){
                return item.Time.getDate() == cur_date.getDate();
              })
            if(d.length == 0){
                frequency_arr.push(0);
                daily_desc_arr.push(null);
            }
            else{
                frequency_arr.push(d[0].Frequency);
                daily_desc_arr.push(d[0].Daily_Desc);
            }
        }
        console.log("frequency_arr: ", frequency_arr);
        console.log("daily_desc_arr: ", daily_desc_arr);
        res.status(200).send({ message: 'success', frequency: frequency_arr, daily_desc: daily_desc_arr});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const RecordsOfATask = async(req, res) => {
    console.log("inside RecordsOfATask function");
    var userList = [];
    var result = [];
    try {
        const threshold = await Task.find({'Task_ID': req.query.task_id}, {Threshold: 1, _id: 0});
        await Participation.find({'Task_ID': req.query.task_id, 'Is_Quit': false}, {_id: 0, User_ID: 1}).then(user => {
            user.map((d, k) => {
                userList.push(d.User_ID);
            })

            Record.find({'Task_ID': req.query.task_id, User_ID: { $in: userList }, 'Time': req.query.time}, {User_ID: 1, Frequency: 1, _id: 0})
            .then( async (data) => {
                await Promise.all(
                    user.map(async (d, k) => {
                        var dd = data.filter(function(item, index, array){
                            return item.User_ID == d.User_ID;
                        })
                        if(dd.length == 0){
                            result.push({'User_ID': d.User_ID, 'Frequency': 0, 'boolean': false});
                        }
                        else{
                            if(dd[0].Frequency >= threshold[0].Threshold){
                                result.push({'User_ID': dd[0].User_ID, 'Frequency': dd[0].Frequency, 'boolean': true});
                            }
                            else{
                                result.push({'User_ID': dd[0].User_ID, 'Frequency': dd[0].Frequency, 'boolean': false});
                            }
                        }
                    })
                )

                console.log("Today User's list:")
                console.log(result);
                res.status(200).send({ message: 'success', data: result});
            })
        })
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const CountOfATask = async(req, res) => {
    console.log("inside CountOfATask function");
    try {
        var count = 0;
        const threshold = await Task.find({'Task_ID': req.query.task_id}, {Threshold: 1, _id: 0});
        await Record.find({'Task_ID': req.query.task_id, 'Time': req.query.time}, {_id: 0, Frequency: 1}).then(data => {
            data.map((d, k) => {
                if(d.Frequency >= threshold[0].Threshold){
                    count++;
                }
            })
            res.status(200).send({ message: 'success', count: count});
        })
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const checkDayDoneOfAUser = async(req, res) => {
    console.log("inside oneBooleanOfADay function");
    try {
        var result = Object();
        const threshold = await Task.find({'Task_ID': req.query.task_id}, {Threshold: 1, _id: 0});
        const Data = await Record.findOne({'User_ID': req.query.user_id, 'Task_ID': req.query.task_id, 'Time': req.query.time}, {_id: 0, __v: 0, User_ID: 0, Task_ID: 0, Time: 0});
        console.log("Data: ",Data);
        if(Data){
            if(Data.Frequency >= threshold[0].Threshold){
                result['Frequency'] = Data.Frequency;
                result['boolean'] = true;
            }
            else{
                result['Frequency'] = Data.Frequency;
                result['boolean'] = false;
            }
        }
        else{
            result['Frequency'] = 0;
            result['boolean'] = false;
        }
        res.status(200).send({ message: 'success', data: result});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};

export const calculateMoney = async(req, res) => {
    console.log("inside calculateMoney function");
    var userList = [];
    var result = [];
    const today = calculate_now_date();
    let today_date = new Date(today);
    try {
        const taskDetail = await Task.find({'Task_ID': req.query.task_id}, {Threshold: 1, _id: 0, Account_Day: 1, Working_Day: 1, Punish: 1});
        await Participation.find({'Task_ID': req.query.task_id, 'Is_Quit': false}, {_id: 0, User_ID: 1, Last_Calculate_Day: 1, Punish_Sum: 1}).then(user => {
            var calculate_today = true;
            user.map((d) => {
                userList.push(d.User_ID);
                if(d.Last_Calculate_Day.getDate() != today_date.getDate()){
                    calculate_today = false;
                }
            })
            if(calculate_today == true){
                user.map((d) => {
                    result.push({'User_ID': d.User_ID, 'Punish_Sum': d.Punish_Sum});
                })
                res.status(200).send({ message: 'success', data: result});
            }
            else{
                Record.find({'Task_ID': req.query.task_id, User_ID: { $in: userList }, 'Time': {$gte: taskDetail[0].Account_Day, $lt: today}}, {User_ID: 1, Frequency: 1, _id: 0, Time: 1})
                .then( async (data) => {
                    await Promise.all(
                        user.map(async (d) => {
                            var money = 0;
                            let cur_date = new Date(taskDetail[0].Account_Day);
                            while(cur_date.getTime() < today_date.getTime()){
                                var dWeek = (cur_date.getDay()+6)%7;
                                var f = data.filter(function(item){
                                    return item.Time.getTime() == cur_date.getTime() && item.User_ID == d.User_ID;
                                  })
                                if(taskDetail[0].Working_Day[dWeek] == 1){
                                    if(f.length == 0){
                                        money += taskDetail[0].Punish;
                                    }
                                    else{
                                        if(f[0].Frequency < taskDetail[0].Threshold){
                                            money += taskDetail[0].Punish;
                                        }
                                    }
                                }
                                cur_date.setDate(cur_date.getDate() + 1);
                            }
                            await Participation.updateOne({ 'Task_ID': req.query.task_id, 'User_ID': d.User_ID}, {$set: {Punish_Sum: money, Last_Calculate_Day: today} });
                            result.push({'User_ID': d.User_ID, 'Punish_Sum': money});
                        })
                    )
    
                    console.log("User's Punish_Sum list:")
                    console.log(result);
                    res.status(200).send({ message: 'success', data: result});
                })
            }
        })
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};