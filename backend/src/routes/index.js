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
const router = express.Router()

router.get("/test", (req, res) => {
    res.send("Hello world");
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
    oneAvatar(req,res);
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
router.post('/task', (req, res) => {
    addOneTask(req, res);
})



router.delete('/clear-db', (req, res) => {
    // deleteScoreCard(req,res);
})

router.get('/query-cards', (req, res) => {
//   queryScoreCard(req,res);
})

export default router