// 可以打卡的那個介面 

// taskID: send as parameter
// avatar

// task name

import { useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Avatar, Typography, Tooltip } from 'antd';
import TaskDescCard from "../Components/taskDescCard";


const TaskView = ({taskId}) => {

    // default setting
    const { Title, Text } = Typography;

    // 陳沛妤

    const [taskName, setTaskName] = useState('早睡早起身體好');
    const [taskAvatar, setTaskAvatar] = useState('https://joeschmoe.io/api/v1/random');
    // 總共需要打幾次卡: 如果只有一次的話就不顯示progress bar
    const [expectedFrequency, setExpectedFrequency] = useState(10);
    // 總共打了幾次卡
    const [frequency, setFrequency] = useState(2);
    // 是否達標
    const [done, setDone] = useState(false);
    // 每日文字記錄: 如果未完成的話就這個
    const [description, setDescription] = useState('');
    // 
    const [selectDate, setSelectDate] = useState('2021-01-01');
    
    return(
        <>
        <Title level={3}>{taskName}</Title>
        <Avatar size={120} src={taskAvatar}  />
        <TaskDescCard done={done} desc={description}/>
        </>
    )
}

export default TaskView;