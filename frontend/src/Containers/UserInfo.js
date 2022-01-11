

/* 
1. 沒有編輯功能
個人資料
姓名
信箱
ID
個人任務
管理中任務
個人管理任務
參與中任務
*/
import {Typography, Divider} from 'antd';
import { useState } from 'react';
import TaskCard from '../Components/TaskCard';
import styled from 'styled-components'
const { Title, Text, Link } = Typography;


const UserInfo = ({userId}) => {
    const [name, setName] = useState("巫芊瑩");
    const [email, setEmail] = useState("wcy881218@gmail.com");
    const Tasks = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    `
    const [managedTaskInfo, setManagedTaskInfo] = useState([
        {"uid": "1", "icon": "https://joeschmoe.io/api/v1/random", "name": "推甄早點上岸群"},
    ]);
    const [openTaskInfo, setOpenTaskInfo] = useState([
        {"uid": "2", "icon": "https://joeschmoe.io/api/v1/random", "name": "早睡早起身體好"},
        {"uid": "3", "icon": "https://joeschmoe.io/api/v1/random", "name": "Leetcode王"},
    ]);
    const [closeTaskInfo, setCloseTaskInfo] = useState([
        {"uid": "4", "icon": "https://joeschmoe.io/api/v1/random", "name": "推甄早點上岸群"},
    ]);

    return(
        <div className="site-layout-background" style={{ marginTop: 48, minHeight: 360 }}>
        <Divider orientation="left">個人資料</Divider>
        {/* 我先擺上去 之後排版...... */}
        <Text>姓名: {name}</Text><br/>
        <Text>信箱: {email}</Text><br/>
        <Text>ID: {userId}</Text>
        <Divider orientation="left">管理中任務</Divider>
        <Tasks>
        {managedTaskInfo.map(
            task => {
                return(
                    <TaskCard uid={task.uid} icon={task.icon} name={task.name}/>
                )
            }
        )}
        </Tasks>
        <Divider orientation="left">參與中任務</Divider>
        <Divider orientation="left">開啟中任務</Divider>
        <Tasks>
        {openTaskInfo.map(
            task => {
                return(
                    <TaskCard uid={task.uid} icon={task.icon} name={task.name}/>
                )
            }
        )}
        </Tasks>
        <Divider orientation="left">關閉中任務</Divider>
        <Tasks>
        {closeTaskInfo.map(
            task => {
                return(
                    <TaskCard uid={task.uid} icon={task.icon} name={task.name}/>
                )
            }
        )}
        </Tasks>
    </div>
    )
}

export default UserInfo