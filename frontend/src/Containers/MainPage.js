import { Layout, Menu, Breadcrumb, Button, Avatar, Typography } from 'antd';

import { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';









const MainPage = ({setToken, setValid}) => {

    // 版面配置所需資訊
    const [collapsed, setCollapsed] = useState(false)
    const { Content, Sider } = Layout;
    const { SubMenu } = Menu;

    // Typology default setting
    const { Title } = Typography;

    // 資料串接所需資訊
    // FE: 記得設定任務名稱字數上限
    const [tasksInfo, setTasksInfo] = useState([
        {"uid": "1", "icon": "https://joeschmoe.io/api/v1/random", "name": "推甄早點上岸群"},
        {"uid": "2", "icon": "https://joeschmoe.io/api/v1/random", "name": "早睡早起身體好"},
        {"uid": "3", "icon": "https://joeschmoe.io/api/v1/random", "name": "一天一leetcode，offer接近我"},
        {"uid": "4", "icon": "https://joeschmoe.io/api/v1/random", "name": "推甄早點上岸群"},
    ]);
    const [userName, setUserName] = useState("巫芊瑩");
    const [userAvatar, setUserAvatar] = useState("https://joeschmoe.io/api/v1/random");


    return(
        <Layout style={{ minHeight: '100vh' }}>
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
          
          {/* 加入登出按鈕 */}
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
            {/* 以下麵包屑 FE待修正 */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Breadcrumb style={{position: 'fixed'}}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {/* 以下是主要文件 */}
            <div className="site-layout-background" style={{ marginTop: 48, minHeight: 360 }}>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Friend</h1>
              <h1>Friend</h1>
              <h1>Friend</h1>
              <h1>Friend</h1>
              <h1>Friend</h1>
              <h1>Friend</h1>
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>

    )
}

export default MainPage;