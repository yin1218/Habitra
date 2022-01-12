/*

選項：
1: 我要成為日文王：taskInfo
2: 任務簡述：taskDescription
3: 成員清單：taskMember
4: 任務統計：taskStats
 */
import styled from 'styled-components'
import SideBar from '../Components/SideBar';
import { Layout, Breadcrumb, Button, Avatar, Typography, Tooltip } from 'antd';
import { useState, useParams } from 'react';




const TaskMainPage = ({setToken, setValid, userId}) => {

    // default settings
    const { Content } = Layout;
    let {taskID} = useParams(); 
    // set current page
    const [page, setPage] = useState(1);
    /*
    選項：
    1: 我要成為日文王：taskInfo
    2: 任務簡述：taskDescription
    3: 成員清單：taskMember
    4: 任務統計：taskStats
    */
    
    // 資料串接 @陳沛妤
    const [userName,setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('https://joeschmoe.io/api/v1/random');

    

    return(
        <Layout style={{ minHeight: '100vh' }}>
        <SideBar place = "taskMainPage" userId = {userId} userName={userName} userAvatar={userAvatar} setValid={setValid}  setPage={setPage} setToken={setToken}/>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
            {/* 以下麵包屑 FE待修正 */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          </Content>
        </Layout>
        {/* 加一個可以新增任務的固定按鈕，hover可以看到詳細資訊 */}      

    </Layout>
    )
}

export default TaskMainPage;