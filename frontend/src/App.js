import './App.css';
import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'antd/dist/antd.css';

import { testToken } from './axios';

import LoginPage from './Containers/LoginPage';
import SignUpPage from './Containers/SignUpPage';
import PageNotFound from './Containers/PageNotFound';
import MainPage from './Containers/MainPage';



function App() {
  const [me, setMe] = useState("")
  const [isLogin, setIsLogin] = useState(false);
  const[token, setToken] = useState(""); //@前端 token
  const[valid, setValid] = useState(false); //@前端 token storage


  function PrivateRoute({ children }) {
    // const auth = useAuth();
    return isLogin ? children : <Navigate to="/login" />;

  }

  useEffect( async () => {
    const response = await testToken({token: token});
    if(response === 'token success'){
      setValid(true);
    }
  }, [token]); 

  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path='/' element={isLogin ? <MainPage /> : <LoginPage setIsLogin={setIsLogin} setToken={setToken} />}></Route>
        {/* private route */}
        <Route path='/login' element={
          <PrivateRoute>  
            <LoginPage setIsLogin={setIsLogin} />
          </PrivateRoute>}>
        </Route>
        <Route path='/signUp' element={<SignUpPage />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
