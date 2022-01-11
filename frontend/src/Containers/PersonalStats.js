// 這...這個還沒...我考完試再來寫（大概四點多）
import { DatePicker, Space } from 'antd';
import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import StatsInfoCard from '../Components/StatsInfoCard';


const PersonalStats = ({userId}) => {

    // default settings

    // to 陳沛妤: variables
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // task list
    const [task, setTask] = useState([]);
    // total statistic list 在接的時候加總
    const [achieveCount, setAchieveCount] = useState([1,0,2,1,10,0,0]);
    // to 陳沛妤: 這邊是每周應打卡次數，你也可以取一個好聽一點的名字
    const [expectedTotalCount, setExpectedTotalCount] = useState(100);

    // function
    const formatDate = (date)=>{
        console.log(date);
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate();
        console.log(formatted_date);
        return formatted_date;
    }

    const weekOnChange = (date) => {
        // get start and end of the week
        let firstday = new Date(date.setDate(date.getDate() - date.getDay()));
        let lastday = new Date(date.setDate(date.getDate() - date.getDay()+6));

        // transform to assigned format
        setStartDate(formatDate(firstday)); 
        setEndDate(formatDate(lastday));

        // to 陳沛妤: 在這邊先接所有task資料，再一個個加總到achieveCount裡面QQ
    }

    // Component
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
              alias: '打卡完成次數',
            },
          },
        };
        return <Column {...config} />;
      };

    return(
        <>
            <DatePicker onChange={(e) => weekOnChange(e._d)} picker="week" />
            <DemoColumn />
            <StatsInfoCard achieveTotalCount={achieveCount.reduce((a, b) => a + b, 0)} expectedTotalCount={expectedTotalCount} />
        </>
        
    )
}

export default PersonalStats;



// GET /record/period/{user_id}/{task_id}/{start_time}/{end_time}  取得特定使用者某時間區間的特定任務的統計資訊
// param: user_id, task_id, start_time, end_time
// return: [frequency], [daily_desc]





