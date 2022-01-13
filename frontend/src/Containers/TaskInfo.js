// 可以看任務詳細資訊的那個介面
//巫芊瑩：這邊還沒有把資訊好好擺上去，記得補充

/*
avatar 
任務簡介
任務規則

關閉任務
刪除任務
 */

import styled from "styled-components";
import { useState } from "react";
import { Typography, Button, Avatar } from "antd";
import moment from "moment";
const TaskInfo = ({taskId}) => {

    //default settings
    const {Title, Text} = Typography;

    const DangerZone = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin-top: 2%;
    border: 2px red solid;
    padding: 1%;

    
    background: transparent;
    border-radius: 5px;
    `

    //陳沛妤
    //判斷是否是管理者，決定是否要顯示danger zone

    // 刪除的時候要加上一個double confirm 的 box
    const [isManager, setIsManager] = useState(true);
    //任務資訊
    const [taskAvatar, setTaskAvatar] = useState('https://joeschmoe.io/api/v1/random');
    const [taskName, setTaskName] = useState("一起去跑步");
    const [taskDescription, setTaskDescription] = useState("請不要說不!~~~~~~");
    
    // 打卡次數
    const [threshold, setThreshold] = useState(1);
    // 需要計算的日期[INT]
    const [workDay, setWorkDay] = useState([1,1,1,1,1,1,1]); //因原本前端的格式和串接有點不一樣，重新設的變數
    // 懲罰一天的扣錢數量
    const [punish, setPunish] = useState(0);
    // 是否需要上傳文字
    const [need_daily_desc, setNeed_daily_desc] = useState(false);
    // 打卡區間
    const [start_hour, setStart_hour] = useState("00:00");
    const [end_hour, setEnd_hour] = useState("23:59");
    const [taskOpenDate, setOpentDate] = useState("2021-11-11");
    const [taskCloseDate, setTaskCloseDate] = useState("2021-11-15");

    return(
        <>
            <Avatar size={120} src={taskAvatar}  />
            <Title level={3}>任務簡介</Title>
            <Text>{taskDescription}</Text>
            <Title level={3}>任務規則</Title>
            <Text>任務開始時間:{taskOpenDate}</Text>
            <br />
            <Text>任務關閉時間:{taskCloseDate}</Text>
            <br />
            <Text>任務名稱:{taskName}</Text>
            <br />
            <Text>需打卡次數:{threshold}</Text>
            <br />
            <Text>懲罰機制（罰金）:{punish}</Text>
            <br />
            <Text>是否需上傳文字:{need_daily_desc}</Text>
            <br />
            <Text>可打卡時段:{start_hour} ~ {end_hour}</Text>
            {
                isManager
                ?
                <>
                <DangerZone>
                    <Title level={4} style={{color:"red"}}>關閉任務</Title>
                    <Button type="primary" size="small" danger>關閉任務</Button>
                </DangerZone>     
                <DangerZone>
                    <Title level={4} style={{color:"red"}}>刪除任務</Title>
                    <Button type="primary" size="small" danger>刪除任務</Button>
                </DangerZone> 
                </>  
                :
                <></>
            }

        </>
        
    )
}

export default TaskInfo;