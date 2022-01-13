// 可以打卡的那個介面 

// taskID: send as parameter
// avatar

// task name

import { useState } from "react";
// import { Layout, Menu, Breadcrumb, Button, Avatar, Typography, DatePicker } from 'antd';
import { DatePicker, Typography, Avatar } from 'antd';
import TaskDescCard from "../Components/TaskDescCard";
import styled from "styled-components";


const TaskView = ({taskId}) => { 

    // default setting
    const { Title, Text } = Typography;
    const AddDone = styled.div`
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
    const [description, setDescription] = useState('今天有去跑步，好快樂><');
    // 
    const [selectDate, setSelectDate] = useState('2021-01-01');

    const dateOnChange = (inputDate) => {
        setSelectDate(formatDate(inputDate));
        // console.log(selectDate);
    }
    
    // 這邊跟personal stats的function合再一起寫在utility
    const formatDate = (date)=>{
        console.log(date);
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate();
        console.log(formatted_date);
        return formatted_date;
    }
    
    return(
        <>
        <Title level={3}>{taskName}</Title>
        <Avatar size={120} src={taskAvatar}  />
        <DatePicker onChange={(e) => dateOnChange(e._d) } allowClear={false} />
        <TaskDescCard done={done} desc={description}/>
        <AddDone></AddDone>
        </>
    )
}

export default TaskView;