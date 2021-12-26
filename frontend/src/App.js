import './App.css';
import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'antd/dist/antd.css';

import { testToken } from './axios';

import LoginPage from './Containers/LoginPage';
import SignUpPage from './Containers/SignUpPage';
import PageNotFound from './Containers/PageNotFound';
import MainPage from './Containers/MainPage';

const LOCALSTORAGE_KEY = "";

function App() {
  const savedToken = localStorage.getItem(LOCALSTORAGE_KEY);
  
  // const [me, setMe] = useState("")
  const [isLogin, setIsLogin] = useState(false);
  const[token, setToken] = useState(savedToken || ""); //@前端 token
  const[valid, setValid] = useState(false); //@前端 token storage


  function PrivateRoute({ children }) {
    // const auth = useAuth();
    return valid ? children : <Navigate to="/login" />;

  }

  useEffect( async () => {
    const response = await testToken({token: token});
    if(response === 'token success'){
      setValid(true);
    }
  }, [token]); 

  useEffect(() => {
    if(isLogin){
      localStorage.setItem(LOCALSTORAGE_KEY, token);
    }
  }, [isLogin, token])

  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path='/' element={valid ? <MainPage /> : <LoginPage setIsLogin={setIsLogin} setToken={setToken} />}></Route>
        {/* private route */}
        <Route path='/login' element={
          <PrivateRoute>  
            <LoginPage setIsLogin={setIsLogin} />
          </PrivateRoute>}>
        </Route>
        <Route path='/signUp' element={
        <PrivateRoute>
          <SignUpPage />
        </PrivateRoute>
        }></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
