

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
import { useState, useEffect } from 'react';
import TaskCard from '../Components/TaskCard';
import styled from 'styled-components'
import { getAdmin, getNotAdminAndFinish, getNotAdminAndGoing, getTaskDetail } from '../axios';
const { Title, Text, Link } = Typography;


const UserInfo = ({userId, name, email, token}) => {
    const Tasks = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    `

    const [managedTaskInfo, setManagedTaskInfo] = useState([]);
    const [openTaskInfo, setOpenTaskInfo] = useState([]);
    const [closeTaskInfo, setCloseTaskInfo] = useState([]);

    useEffect( async () => {
        const response_1 = await getAdmin({user_id: userId, token: token});
        const response_2 = await getNotAdminAndGoing({user_id: userId, token: token});
        const response_3 = await getNotAdminAndFinish({user_id: userId, token: token});
        
        for(var i = 0; i < response_1.length; i++){
            const res = await getTaskDetail({task_id: response_1[i].Task_ID, token: token});
            var temp = new Object();
            temp.uid = response_1[i].Task_ID;
            temp.icon = res.Icon;
            temp.name = res.Title;
            setManagedTaskInfo([...managedTaskInfo, temp]);
        }
        for(var i = 0; i < response_2.length; i++){
            const res = await getTaskDetail({task_id: response_2[i].Task_ID, token: token});
            var temp = new Object();
            temp.uid = response_2[i].Task_ID;
            temp.icon = res.Icon;
            temp.name = res.Title;
            setOpenTaskInfo([...openTaskInfo, temp]);
        }
        for(var i = 0; i < response_3.length; i++){
            const res = await getTaskDetail({task_id: response_3[i].Task_ID, token: token});
            var temp = new Object();
            temp.uid = response_3[i].Task_ID;
            temp.icon = res.Icon;
            temp.name = res.Title;
            setCloseTaskInfo([...closeTaskInfo, temp]);
        }
      }, []);

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