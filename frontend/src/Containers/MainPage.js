import { Layout, Breadcrumb, Button, Avatar, Typography, Tooltip } from 'antd';
import { Link } from 'react-router-dom'
import SideBar from '../Components/SideBar';
import PersonalTasks from './PersonalTasks';
import PersonalStats from './PersonalStats';
import { getUserInfo } from '../axios';

import { useState, useEffect } from 'react';

import {
    UsergroupAddOutlined
  } from '@ant-design/icons';

import styled from 'styled-components'
import UserInfo from './UserInfo';







const MainPage = ({setToken, setValid, userId, setUserName, userName}) => {

    var name, avatar, email;
    useEffect( async () => {
        console.log(userId);
        const response = await getUserInfo({user_id: userId});
        avatar = response.Avatar;
        name = response.Name;
        email = response.Email;
      }, []);

    const [userAvatar, setUserAvatar] = useState(avatar);
    setUserName(name);
    const [userEmail, setEmail] = useState(email);
    const { Content } = Layout;
    // 資料串接所需資訊
    // FE: 記得設定任務名稱字數上限
    const [ongoingTaskInfo, setOngoingTaskInfo] = useState([
        {"uid": "1", "icon": "https://joeschmoe.io/api/v1/random", "name": "推甄早點上岸群"},
    ]);
    const [doneTaskInfo, setDoneTaskInfo] = useState([
        {"uid": "2", "icon": "https://joeschmoe.io/api/v1/random", "name": "早睡早起身體好"},
        {"uid": "3", "icon": "https://joeschmoe.io/api/v1/random", "name": "Leetcode王"},
    ]);
    const [relaxTaskInfo, setRelaxTaskInfo] = useState([
        {"uid": "4", "icon": "https://joeschmoe.io/api/v1/random", "name": "推甄早點上岸群"},
    ]);
    

    // set current page
    const [page, setPage] = useState(1);
    // 1: PersonalTasks, 2: PersonalStats


    const AddTask = styled.div`
        position: fixed;
        margin-left: 93vw;
        margin-top: 90vh;

        width: 50px;
        height: 50px;

        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 1000px;

        text-align: center;
        line-height: 50px;
    `

    return(
    <Layout style={{ minHeight: '100vh' }}>
        <SideBar place = "mainPage" userId = {userId} userName={userName} userAvatar={userAvatar} setValid={setValid}  setPage={setPage} setToken={setToken}/>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
            {/* 以下麵包屑 FE待修正 */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Breadcrumb style={{position: 'fixed'}}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {/* 以下是主要文件 */}
            {
                page === 1
                ? <PersonalTasks ongoingTaskInfo={ongoingTaskInfo} doneTaskInfo={doneTaskInfo} relaxTaskInfo={relaxTaskInfo} />
                :
                page === 2
                ?  <PersonalStats userId={userId}  />
                : <UserInfo userId={userId} />
            }
          </Content>
        </Layout>
        {/* 加一個可以新增任務的固定按鈕，hover可以看到詳細資訊 */}
        
            <Tooltip title="新增任務">
                <AddTask>
                {/* <Button type="text">Text Button</Button> */}
                <Link to="/addTask">
                     <Button type="text" shape="circle" icon={<UsergroupAddOutlined />} size="large" />
                </Link>
                </AddTask>
            </Tooltip>
        

    </Layout>
    )
}

export default MainPage;