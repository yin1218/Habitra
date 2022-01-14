// 可以打卡的那個介面 

// taskID: send as parameter
// avatar

// task name

import { useState, useEffect } from "react";
// import { Layout, Menu, Breadcrumb, Button, Avatar, Typography, DatePicker } from 'antd';
import { DatePicker, Typography, Avatar, Progress } from 'antd';
import TaskDescCard from "../Components/TaskDescCard";
import styled from "styled-components";
import { getTaskDetail, getDailyRecord, getTask, getParticipationDetail } from '../axios';
import { C } from "caniuse-lite/data/agents";


const TaskView = ({taskId, token, userId}) => { 

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

    const [taskName, setTaskName] = useState('');
    const [taskAvatar, setTaskAvatar] = useState('');
    // 總共需要打幾次卡: 如果只有一次的話就不顯示progress bar
    const [expectedFrequency, setExpectedFrequency] = useState(0);
    // 總共打了幾次卡
    const [frequency, setFrequency] = useState(0);
    // 是否達標
    const [done, setDone] = useState(false);
    // 每日文字記錄: 如果未完成的話就這個
    const [description, setDescription] = useState('');
    // 
    const [selectDate, setSelectDate] = useState('2021-01-01');
    const [isClosed, setIsClosed] = useState(false); //巫：未處理
    const [isAdmin, setIsAdmin] = useState(false); //巫：未處理

    const dateOnChange = (inputDate) => {
        setSelectDate(formatDate(inputDate));
    }

    // 這邊跟personal stats的function合再一起寫在utility
    const formatDate = (date)=>{
        var str1 = date.getMonth() + 1;
        var str2 = date.getDate();
        if(parseInt(date.getMonth() + 1) < 10){
            str1 = '0'+ (date.getMonth() + 1);
        }
        if(parseInt(date.getDate()) < 10){
            str2 = '0'+date.getDate();
        }
        let formatted_date = date.getFullYear() + "-" + str1 + "-" +str2;
        return formatted_date;
    }

    useEffect( async () => {
        const res = await getTaskDetail({task_id: taskId, token: token});
        console.log(res);
        setTaskName(res.Title);
        setTaskAvatar(res.Icon);
        setExpectedFrequency(res.Threshold);

        const res_2 = await getTask({task_id: taskId, token: token});
        setIsClosed(res_2.Is_Closed);

        const res_3 = await getParticipationDetail({user_id: userId, task_id: taskId});
        setIsAdmin(res_3.Is_Admin);
    
      }, []);

      useEffect( async () => {
        setDone(false);
        const res_1 = await getDailyRecord({user_id: userId, task_id: taskId, time: selectDate, token: token});
        setFrequency(res_1.Frequency);
        setDescription(res_1.Daily_Desc);
      }, [selectDate]);

      useEffect( async () => {
        if(frequency >= expectedFrequency && frequency != 0) setDone(true);
      }, [frequency]);
    
    return(
        <>
        <Title level={3}>{taskName}</Title>
        <Avatar size={120} src={taskAvatar}  />
        <DatePicker onChange={(e) => dateOnChange(e._d) } allowClear={false} />
        <Progress percent={frequency/expectedFrequency * 100} size="small" />
        <TaskDescCard done={done} desc={description}/>
        <AddDone></AddDone>
        </>
    )
}

export default TaskView;

