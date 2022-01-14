// 可以看大家欠了多少錢的那個介面 

// 可以看有哪些介面的那個介面 

/*

1. 錢包
(1) Modal: List(頭貼. 名字. 欠的錢. 清空案件, 關閉案件)
2. 長條圖
 */
import { Column } from '@ant-design/plots';
import { useState } from "react";
import {Modal, Typography, Statistic, List, Avatar, Button, message, DatePicker,Row,  Col} from 'antd';
import styled from "styled-components";
import { Icon } from '@iconify/react';

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
    const formatDate = (date)=>{
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate();
        return formatted_date;
    }
    
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

    //陳沛妤: 這邊是每個任務的人指定日期的完成資訊，指定日期是selectedDate
    const [taskThreshold, setTaskThreshold] = useState(10)
    const [finishTaskMemberInfo, setFinishTaskMemberInfo] = useState([
        {
            "User_ID": "gary1030",
            "User_Name": "蓋瑞",
            "Avatar": " https://joeschmoe.io/api/v1/random",
            "frequency": 1
        },
        {
            "User_ID": "zoe1234",
            "User_Name": "小陳",
            "Avatar": " https://joeschmoe.io/api/v1/random",
            "frequency": 200
        }

    ])
    const [unfinishTaskMemberInfo, setUnfinishTaskMemberInfo] = useState([
        {
            "User_ID": "zoe1234",
            "User_Name": "小陳",
            "Avatar": " https://joeschmoe.io/api/v1/random",
            "frequency": 200
        }

    ])

    //總欠款: 接memberInfo的時候要加總
    const [totalArrear, setTotalArrear] = useState(sum(oweMemberInfo, "Punish_sum"));
    const [isMgr, setIsMgr] = useState(true);
    const [startDate, setStartDate]=  useState("");
    const [endDate, setEndDate]=  useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [achieveCount, setAchieveCount] = useState([1,1,1,1,1,1,2]);

    
    const handleEmtifiedFee = () => {
        // 陳沛妤: 幫我把大家的欠款清空
        message.success("已成功清空，祝大家有美好的一餐~");
        setOpenModal(false);
    }
    const weekOnChange = (date) => {
        // get start and end of the week
        console.log(formatDate(date));
        setSelectedDate(formatDate(date));
        let firstday = new Date(date.setDate(date.getDate() - date.getDay()));
        let lastday = new Date(date.setDate(date.getDate() - date.getDay()+6));

        // transform to assigned format
        setStartDate(formatDate(firstday)); 
        setEndDate(formatDate(lastday));

        console.log(formatDate(firstday),",", formatDate(lastday));
        // to 陳沛妤: 在這邊先接所有task資料，再一個個加總到achieveCount裡面QQ
    }


    const DemoColumn = () => {
        const data = [
          {
            type: 'Sun',
            sales: achieveCount[0],
          },
          {
            type: 'Mon',
            sales: achieveCount[1],
          },
          {
            type: 'Tue',
            sales: achieveCount[2],
          },
          {
            type: 'Wed',
            sales: achieveCount[3],
          },
          {
            type: 'Thur',
            sales: achieveCount[4],
          },
          {
            type: 'Fri',
            sales: achieveCount[5],
          },
          {
            type: 'Sat',
            sales: achieveCount[6],
          },
        ];
        const config = {
          data,
          xField: 'type',
          yField: 'sales',
          columnWidthRatio: 0.8,
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          },
          meta: {
            type: {
              alias: '星期',
            },
            sales: {
              alias: '打卡完成人數',
            },
          },
        };
        return <Column {...config} />;
      };

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
            <DatePicker onChange={(e) => weekOnChange(e._d)} picker="week" allowClear={false}/>
            <DemoColumn />
            <Row>
                <Col span={12}>
                    <Row>
                        <Icon icon="flat-ui:trash" color="black" height="50" />
                        <Title level={3}>未完成</Title>
                    </Row>
                    <List
                    itemLayout="horizontal"
                    dataSource={unfinishTaskMemberInfo}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={item.Avatar} />}
                            title={<Text >{item.User_Name}</Text>}
                            description={<Text >{item.frequency}次</Text>}
                            />
                        </List.Item>
                    )}
                />
                </Col>
                <Col span={12}>
                    <Row>
                        <Icon icon="emojione:1st-place-medal" color="black" height="50" />
                        <Title level={3}>已完成</Title>
                    </Row>
                    <List
                    itemLayout="horizontal"
                    dataSource={finishTaskMemberInfo}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={item.Avatar} />}
                        title={<Text >{item.User_Name}</Text>}
                        description={<Text >{item.frequency}次</Text>}
                        />
                    </List.Item>
                    )}
                />
                </Col>
            </Row>
            
        </>
    )
}

export default TaskStats;