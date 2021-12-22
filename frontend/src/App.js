import './App.css';
import {useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'antd/dist/antd.css';

import LoginPage from './Containers/LoginPage';
import SignUpPage from './Containers/SignUpPage';
import PageNotFound from './Containers/PageNotFound';



function App() {
  
  const [me, setMe] = useState("")
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<LoginPage setIsLogin={setIsLogin} />}></Route>
        <Route path='/signUp' element={<SignUpPage />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      {/* {
        isLogin
        ?
        <h1>is Login</h1>
        :
        <>
          <SignUpPage />
        </>
      } */}
      </BrowserRouter>
  );
}

export default App;
