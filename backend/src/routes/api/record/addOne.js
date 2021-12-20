import Record from "../../../models/record";

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

const addOneRecord = async (req, res) => {
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


export default addOneRecord;