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

const LOCALSTORAGE_KEY = "";

function App() {
  const savedToken = localStorage.getItem(LOCALSTORAGE_KEY);
  
  // const [me, setMe] = useState("")
  const [isLogin, setIsLogin] = useState(false); //目的：檢測目前是否登入
  const[token, setToken] = useState(savedToken || "");  //目的：檢測當前用戶是否過期
  const[valid, setValid] = useState(false);  //


  function PrivateRoute({ children }) {
    // const auth = useAuth();
    return token==='' ? children : <Navigate to="/login" />;

  }

  // 測試token
  useEffect( async () => {
    const response = await testToken({token: token});
    if(response === 'token success'){
      setValid(true);
      setIsLogin(true);
      localStorage.setItem(LOCALSTORAGE_KEY, token);
    }
  }, [token]); 

  useEffect(() => {
    if(valid === false){
      setIsLogin(false);
    }
  }, [valid, isLogin])


  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path='/' element={token==='' ? <MainPage setToken={setToken} setValid={setValid} /> : <LoginPage setIsLogin={setIsLogin} setToken={setToken} />}></Route>
        {/* private route */}
        <Route path='/login' element={<LoginPage setIsLogin={setIsLogin} />}>
        </Route>
        <Route path='/signUp' element={<SignUpPage />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
        <Route path='/addTask' element={ token==='' ? <AddTaskPage /> : <Navigate to="/login" />}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
