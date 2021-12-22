import './App.css';
import {useState} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'antd/dist/antd.css';

import LoginPage from './Containers/LoginPage';
import SignUpPage from './Containers/SignUpPage';



function App() {
  
  const [me, setMe] = useState("")
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      {
        isLogin
        ?
        <h1>is Login</h1>
        :
        <>
          {/* <LoginPage isLogin={isLogin} setIsLogin={setIsLogin}/> */}
          <SignUpPage />
          {/* <Route path="/" exact component={() => <LoginPage isLogin={isLogin} setIsLogin={setIsLogin}/>}/> */}
          {/* <Route path="/signUp" exact component={() => <SignUpPage/>}/> */}
        </>
      }
      </>
  );
}

export default App;
