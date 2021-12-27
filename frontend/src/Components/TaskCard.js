import styled from 'styled-components'
import {Avatar,Typography, Space} from 'antd'

const { Text } = Typography;



// display:"flex", flexDirection: 'column', justifyContent:"center", margin: '24px', alignItems:"center"
const TaskCard = ({uid, icon, name}) => {
     const Card = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        width: 100px;
        margin: 2%;
        
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 17px;
     `

     return(
         <>
            <Card>
                <Avatar shape="square" size="large" src={icon} />
                <div style={{fontSize: 1}}>{name}</div>
            </Card>
         </>

     )
}

export default TaskCard;