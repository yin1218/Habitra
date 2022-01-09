import Record from "../../../models/record";

export const oneRecordOfADay = async(req, res) => {
    console.log("inside oneRecordOfADay function");
    try {
        const Data = await Record.findOne({'User_ID': req.query.user_id, 'Task_ID': req.query.task_id, 'Time': req.query.time}, {_id: 0, __v: 0, User_ID: 0, Task_ID: 0, Time: 0});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
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
        var start_date = new Date(req.query.start_time);
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

