/*

選項：
1: 我要成為日文王：taskInfo
2: 任務簡述：taskDescription
3: 成員清單：taskMember
4: 任務統計：taskStats
 */
import styled from 'styled-components'
import SideBar from '../Components/SideBar';
import { Layout, Modal, Button, Avatar, Typography, Tooltip, Input } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    CheckSquareOutlined
  } from '@ant-design/icons';

import TaskView from './TaskView';
import TaskInfo from './TaskInfo';
import TaskMenber from './TaskMember';
import TaskStats from './TaskStats';

const TaskMainPage = ({setToken, setValid, userId}) => {

    // default settings
    const { TextArea } = Input;
    const {Text} = Typography;
    const { Content } = Layout;
    let {taskID} = useParams();
    console.log(taskID);
    const [page, setPage] = useState(1);
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
    //打卡顯示controller
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    // 陳沛妤：這邊要送出打卡資料　｜　巫芊瑩：成功的話要有msg, 等接好後記得加
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const textOnChange = e => {
        console.log('Change:', e.target.value);
        setTypedDesc(e.target.value);
      };
    
    
    // 資料串接 @陳沛妤
    const [userName,setUserName] = useState('巫芊瑩');
    const [userAvatar, setUserAvatar] = useState('https://joeschmoe.io/api/v1/random');
    const [closed, setClosed] = useState(false); //透過這個判斷要不要顯示打卡按鈕
    const [typedDesc, setTypedDesc] = useState('');
    

    return(
        <Layout style={{ minHeight: '100vh' }}>
        <SideBar place = "taskMainPage" userId = {userId} userName={userName} userAvatar={userAvatar} setValid={setValid}  setPage={setPage} setToken={setToken}/>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
            {/* 以下麵包屑 FE待修正 */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              {/* <p>This is task main page!</p> */}
              {
                  page === 1
                  ?
                    <TaskView />
                  :
                  page === 2
                  ?
                    <TaskInfo />
                  :
                  page === 3
                  ?
                  <TaskMenber />
                  :
                  <TaskStats />
              }
          </Content>
        </Layout>
        {/* 加一個可以新增任務的固定按鈕，hover可以看到詳細資訊 */}   
        {closed
        ?<></>
        :
        <Tooltip title="我要打卡">
            <AddTask>
                <Button type="text" shape="circle" icon={<CheckSquareOutlined />} size="large" onClick={showModal}/>
            </AddTask>
        </Tooltip>
        }   
        <Modal title="我要打卡" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Text >寫下任何的想法都可以喔！</Text>
            <TextArea showCount maxLength={100} onChange={textOnChange} />
      </Modal>

    </Layout>
    ) 
}

export default TaskMainPage;