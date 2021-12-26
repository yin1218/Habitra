import './App.css';
import {useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'antd/dist/antd.css';

import LoginPage from './Containers/LoginPage';
import SignUpPage from './Containers/SignUpPage';
import PageNotFound from './Containers/PageNotFound';
import MainPage from './Containers/MainPage';



function App() {


  
  const [me, setMe] = useState("")
  const [isLogin, setIsLogin] = useState(false);

  function PrivateRoute({ children }) {
    // const auth = useAuth();
    return isLogin ? children : <Navigate to="/login" />;

  }


  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path='/' element={isLogin ? <MainPage /> : <LoginPage setIsLogin={setIsLogin} />}></Route>
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
