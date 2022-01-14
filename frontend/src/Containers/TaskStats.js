// 可以看大家欠了多少錢的那個介面 

// 可以看有哪些介面的那個介面 

/*

1. 錢包
(1) Modal: List(頭貼. 名字. 欠的錢. 清空案件, 關閉案件)
2. 長條圖
 */

import { useState } from "react";
import {Modal, Typography, Statistic, List, Avatar, Button, message} from 'antd';
import styled from "styled-components";

// 記得 {userId}
const TaskStats = () => {

    //default settings
    const [openModal, setOpenModal] = useState(false);
    const {Title, Text} = Typography;
    const CardOutline = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    height: 100px;
    width: 500px;
    margin: 2%;
    border: 20px white solid;

    
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 17px;
    `

    // function
    const sum = (items, prop) => {
        return items.reduce( function(a, b){
            return a + b[prop];
        }, 0);
    };
    
    //以下陳沛妤要看
    const [oweMemberInfo, setOweMemberInfo] = useState([
        {
            "User_ID": "gary1030",
            "User_Name": "蓋瑞",
            "Avatar": " https://joeschmoe.io/api/v1/random",
            "Punish_sum": 1400
        },
        {
            "User_ID": "zoe1234",
            "User_Name": "小陳",
            "Avatar": " https://joeschmoe.io/api/v1/random",
            "Punish_sum": 1200
        }
    ])

    //總欠款: 接memberInfo的時候要加總
    const [totalArrear, setTotalArrear] = useState(sum(oweMemberInfo, "Punish_sum"));
    const [isMgr, setIsMgr] = useState(true);

    const handleEmtifiedFee = () => {
        // 陳沛妤: 幫我把大家的欠款清空
        message.success("已成功清空，祝大家有美好的一餐~");
        setOpenModal(false);
    }

    return(
        <>
        <CardOutline onClick={() => setOpenModal(!openModal) } style={{cursor: 'pointer'}}>
            <Statistic title="累積金額 (NTD)" value={totalArrear} precision={0} />
        </CardOutline>
        <Modal 
            title="貢獻金額成員清單" 
            visible={openModal} 
            onCancel={() => setOpenModal(false)}
            footer={isMgr ? [<Button type="primary" onClick={() => handleEmtifiedFee()}>清空</Button>] : []} 
        >
            <List
                itemLayout="horizontal"
                dataSource={oweMemberInfo}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={item.Avatar} />}
                    title={<Text >{item.User_Name}</Text>}
                    description={<Text >{item.Punish_sum}</Text>}
                    />
                </List.Item>
                )}
            />
            {/* <Divider ></Divider> */}
        </Modal>
        </>
    )
}

export default TaskStats;