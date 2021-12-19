import express from 'express';
import checkId from './api/users/checkId';
import checkEmail from './api/users/checkEmail';
import signUp from './api/users/signUp';
import login from './api/users/login';
const router = express.Router()

router.get("/test", (req, res) => {
    res.send("Hello world");
})

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





router.delete('/clear-db', (req, res) => {
    // deleteScoreCard(req,res);
})

router.get('/query-cards', (req, res) => {
//   queryScoreCard(req,res);
})

export default router