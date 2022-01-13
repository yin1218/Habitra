import './App.css';
import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'antd/dist/antd.css';

import { testToken } from './axios';

import LoginPage from './Containers/LoginPage';
import SignUpPage from './Containers/SignUpPage';
import PageNotFound from './Containers/PageNotFound';
import MainPage from './Containers/MainPage';
import AddTaskPage from './Containers/AddTaskPage';
// import UserInfo from './Containers/UserInfo';
import TaskMainPage from './Containers/TaskMainPage';

const LOCALSTORAGE_KEY = "";
const LOCALSTORAGE_USERID = "";

function App() {
  const savedToken = localStorage.getItem(LOCALSTORAGE_KEY);
  const savedUser = localStorage.getItem(LOCALSTORAGE_USERID);
  
  // const [me, setMe] = useState("")
  const [isLogin, setIsLogin] = useState(false); //目的：檢測目前是否登入
  const[token, setToken] = useState(savedToken || "");  //目的：檢測當前用戶是否過期
  const[valid, setValid] = useState(false);  //
  const[userId, setUserId] = useState(savedUser|"");

  function PrivateRoute({ children }) {
    // const auth = useAuth();
    return valid ? children : <Navigate to="/login" />;

  }

  // 測試token
  useEffect( async () => {
    const response = await testToken({token: token});
    if(response === 'token success'){
      setValid(true);
      setIsLogin(true);
      localStorage.setItem(LOCALSTORAGE_KEY, token);
      localStorage.setItem(LOCALSTORAGE_USERID, userId);
    }
  }, [token]); 

  useEffect(() => {
    if(valid === false){
      setIsLogin(false);
      localStorage.removeItem(LOCALSTORAGE_KEY);
    }
    else{
      setIsLogin(true);
    }
  }, [valid, isLogin])


  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path='/' element={isLogin ? <MainPage setToken={setToken} setValid={setValid} userId={userId}/> : <LoginPage setIsLogin={setIsLogin} setToken={setToken} userId = {userId} setUserId={setUserId} />}></Route>
        {/* private route */}
        <Route path='/login' element={<LoginPage setIsLogin={setIsLogin} userId = {userId} setUserId={setUserId} setToken={setToken}/>}>
        </Route>
        <Route path='/signUp' element={<SignUpPage />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
        <Route path='/addTask' element={ <AddTaskPage token={token}/>}></Route>
        {/* 個人資訊頁面 */}
        {/* <Route path="/userInfo/" element={ valid ? <UserInfo userId = {userId} /> : <Navigate to="/login" />}></Route> */}
        {/* 統計資料頁面 */}
        <Route path='/task/:taskID' element={ <TaskMainPage setToken={setToken} setValid={setValid} userId={userId} /> }></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
