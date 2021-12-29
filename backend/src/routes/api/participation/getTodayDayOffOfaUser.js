import Participation from "../../../models/participation";
import Record from "../../../models/record";
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

const TodayDayOffParticipation_aUser = async(req, res) => {
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


export default TodayDayOffParticipation_aUser;