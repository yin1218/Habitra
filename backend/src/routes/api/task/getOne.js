import Task from "../../../models/task";

const oneTask = async(req, res) => {
    console.log("inside oneTask function");
    try {
        const Data = await Task.findOne({'_id': req.query.task_id});
        console.log("Data: ",Data);
        res.status(200).send({ message: 'success', data: Data});
    } catch (e) { 
        res.status(403).send({ message: 'error', data: null});
        throw new Error("Database query failed"); 
    }
};


export default oneTask;