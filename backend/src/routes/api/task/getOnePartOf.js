import Task from "../../../models/task";

const oneTaskPartOF = async(req, res) => {
    console.log("inside oneTask function");
    try {
        const Data = await Task.findOne({'_id': req.query.task_id}, {_id:0, __v:0, Is_Closed:0, Working_Day:0, Punish:0, Account_Day:0, Need_Daily_Desc:0, updatedAt:0});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};


export default oneTaskPartOF;