import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:5000/api' });

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

export {getAllAvatar, signUp};