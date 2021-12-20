import Task from "../../../models/task";

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

const addOneTask = async (req, res) => {
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


export default addOneTask;