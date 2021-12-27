import { Layout, Menu, Breadcrumb, Button, Avatar, Typography } from 'antd';
import { useState } from 'react';
import {
    TeamOutlined,
    AreaChartOutlined
  } from '@ant-design/icons';


const SideBar = ({userName,userAvatar, setValid, setPage}) => {
    const [collapsed, setCollapsed] = useState(false)
    const { Content, Sider } = Layout;
    const { SubMenu } = Menu;

    // Typology default setting
    const { Title } = Typography;

    return(
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}       
        style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
    }}>
      <div className="logo" />
      {/* Link FE待修正 */}
      {/* 頭貼 */}
      <div style={{ display:"flex", flexDirection: 'column', justifyContent:"center", margin: '24px', alignItems:"center"  }}>
        <Avatar size={collapsed ? 30 : 120} src={userAvatar}  />
        {collapsed
        ?
        <></>
        :
        <>
            <Title level={3}>
                {userName}
            </Title>
            <Button type="text" size='small' onClick={() => setValid(false)}>登出</Button>
        </>
        }
      </div>
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<TeamOutlined />} onClick={() => setPage(1)}>
            團隊任務
        </Menu.Item>
        <Menu.Item key="2" icon={<AreaChartOutlined />} onClick={() => setPage(2)}>
            統計資料
        </Menu.Item>
      </Menu>
    </Sider>
    )

}

export default SideBar;