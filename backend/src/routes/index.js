import express from 'express';
import checkId from './api/users/checkId';
import checkEmail from './api/users/checkEmail';
import signUp from './api/users/signUp';
import login from './api/users/login';
import allAvatar from './api/avatar/getAll';
import oneAvatar from './api/avatar/getOne';
import addOneAvatar from './api/avatar/addOne';
import allIcon from './api/icon/getAll';
import oneIcon from './api/icon/getOne';
import addOneIcon from './api/icon/addOne';
import addOneTask from './api/task/addOne';
import addOneParticipation from './api/participation/addOne';
import oneTask from './api/task/getOne';
import oneTaskPartOF from './api/task/getOnePartOf';
import {allParticipation_aUser, allParticipation_aAdmin} from './api/participation/getAllOfaUser';
import OngoingParticipation_aUser from './api/participation/getOngoingOfaUser';
import FinishParticipation_aUser from './api/participation/getFinishOfaUser';
// import allParticipation_aAdmin from './api/participation/getAllOfaAdmin';
import addOneAdmin from './api/participation/addOneAdmin';
import addOneRecord from './api/record/addOne';
import AvatarByClass from './api/avatar/getbyClass';
import TodayOngoingParticipation_aUser from './api/participation/getTodayOngoingOfaUser';
import TodayFinishParticipation_aUser from './api/participation/getTodayFinishOfaUser';
import TodayDayOffParticipation_aUser from './api/participation/getTodayDayOffOfaUser';
import { CountOfATask, oneRecordOfADay, RecordsOfAPeriod, RecordsOfATask } from './api/record/record';
const auth = require("../middleware/auth");
const router = express.Router()

router.get("/test", auth, (req, res) => {
    res.send({message: "token success"});
})

// phase one
// users
router.post('/users/signUp', (req, res) => {
    signUp(req, res);
})

router.post('/users/signUp/checkId', (req, res) => {
    checkId(req, res);
})

router.post('/users/signUp/checkEmail', (req, res) => {
    checkEmail(req, res);
})

router.post('/users/login', (req, res) => {
    login(req, res);
})


// avatar
router.get('/avatar/all', (req, res) => {
    allAvatar(req,res);
})

router.get('/avatar', (req, res) => {
    if(req.query.avatar_id){
        oneAvatar(req,res);
    }
    else if (req.query.className){
        AvatarByClass(req, res);
    }
    
})

router.post('/avatar', (req, res) => {
    addOneAvatar(req, res);
})

// icon
router.get('/icon/all', (req, res) => {
    allIcon(req,res);
})

router.get('/icon', (req, res) => {
    oneIcon(req,res);
})

router.post('/icon', (req, res) => {
    addOneIcon(req, res);
})


//phase two
// task
router.post('/task', auth, (req, res) => {
    addOneTask(req, res);
})

router.get('/task', auth, (req, res) => {
    oneTask(req,res);
})

router.get('/task/detail', auth, (req, res) => {
    oneTaskPartOF(req,res);
})


// participation
router.post('/participation/newMember', auth, (req, res) => {
    addOneParticipation(req, res);
})

router.post('/participation/newAdmin', auth, (req, res) => {
    addOneAdmin(req, res);
})

router.get('/participation', auth, (req, res) => {
    allParticipation_aUser(req,res);
})

router.get('/participation/admin', auth, (req, res) => {
    allParticipation_aAdmin(req,res);
})

router.get('/participation/notAdmin/ongoing', auth, (req, res) => {
    OngoingParticipation_aUser(req,res);
})

router.get('/participation/notAdmin/finish', auth, (req, res) => {
    FinishParticipation_aUser(req,res);
})

router.get('/participation/ongoing', auth, (req, res) => {
    TodayOngoingParticipation_aUser(req,res);
})

router.get('/participation/finish', auth, (req, res) => {
    TodayFinishParticipation_aUser(req,res);
})

router.get('/participation/dayoff', auth, (req, res) => {
    TodayDayOffParticipation_aUser(req,res);
})

// record
router.post('/record/add', auth, (req, res) => {
    addOneRecord(req, res);
})

router.get('/record/period', auth, (req, res) => {
    RecordsOfAPeriod(req,res);
})

router.get('/record', auth, (req, res) => {
    oneRecordOfADay(req,res);
})

router.get('/record/detail', auth, (req, res) => {
    RecordsOfATask(req,res);
})

router.get('/record/count', auth, (req, res) => {
    CountOfATask(req,res);
})



router.delete('/clear-db', (req, res) => {
    // deleteScoreCard(req,res);
})

router.get('/query-cards', (req, res) => {
//   queryScoreCard(req,res);
})

export default router