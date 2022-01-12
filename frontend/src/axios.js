import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:5000/api' });

//testToken
const testToken = async(props) => {
    const {token} = props;
    try{
        const {data: {message}} = await instance.get('/test',{
            params:{token: token}
        });
        return message;
    }
    catch(error) {
        console.log("token expired");
        return ("token expired");
    }
}

//users
const signUp = async(props) => {
    const {name, email, user_id, password, avatar} = props;
    try{
        const {data: {message}} = await instance.post('/users/signUp',{
            name, email, user_id, password, avatar
        });
        return message;
    }
    catch (error) {
        console.log("error");
    }
}

const signUpCheckId = async(props) => {
    const {user_id} = props;
    const {data: {message}} = await instance.post('/users/signUp/checkId',{
        user_id
    });
    return message;
}

const signUpCheckEmail = async(props) => {
    const {email} = props;
    const {data: {message}} = await instance.post('/users/signUp/checkEmail',{
        email
    });
    return message;
}

const login = async(props) => {
    const {user_id, password} = props;
    try{
        const {data: {userId, name, email, avatar, token}} = await instance.post('/users/login',{
            user_id, password
        });
        return token;
    }
    catch (error) {
        console.log("error" + error);
    }
}

const getUserInfo = async(props) => {
    const {user_id} = props;
    try {
        const { data: {message, data} } = await instance.get('/users',{
            params:{user_id: user_id}
        });
        return data;
    }
    catch (error) {
        console.log("error");
    }  
}

//task
const addTask = async(props) => {
    const {title, description, threshold, working_day, punish, need_daily_desc, icon, start_hour, end_hour, token} = props;
    try{
        const {data: {message, id}} = await instance.post('/task',{
            title, description, threshold, working_day, punish, need_daily_desc, icon, start_hour, end_hour,token
        });
        return id;
    }
    catch (error) {
        console.log("error");
    }
}

//avatar
const getAllAvatar = async() => {
    try {
        var avatarStorage = [];
        const { data: {message, data} } = await instance.get('/avatar/all');
        for(var i = 0; i < data.length; i++){
            avatarStorage.push(data[i]);
        }
        return avatarStorage;
    }
    catch (error) {
        console.log("error");
    }  
}

const getAvatarClass = async(props) => {
    const {className} = props;
    try{
        var avatarStorage = [];
        const { data: {message, data} } = await instance.get('/avatar',{
            params:{className: className}
        });
        for(var i = 0; i < data.length; i++){
            avatarStorage.push(data[i]);
        }
        return avatarStorage;
    }
    catch (error){
        console.log("error");
    }
}

export {getAllAvatar, getAvatarClass, signUp, signUpCheckId, signUpCheckEmail, login, testToken, addTask, getUserInfo};