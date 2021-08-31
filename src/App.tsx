
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { Main } from './Main';

import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { AppstoreAddOutlined, AppstoreOutlined, GoldOutlined, HomeOutlined, LogoutOutlined, MailOutlined, 
  MessageOutlined, ProfileOutlined, ScheduleOutlined, SettingOutlined, TeamOutlined, 
  UnorderedListOutlined, 
  UserOutlined } from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';
import { Badge, Menu, PageHeader } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useEntityWorkshop } from './components/store/EntityStore';


export const App = withRouter(({history}) => {

  const [collapsed, setState] = useState({collapsed: false})
  const [, setMenuState] = useState({current: '1'})
  const [headerText, setHeaderText] = useState('Home');
  const entities = useEntityWorkshop(state => state.entities)
 
  const onCollapse = collapsed => {
    console.log(collapsed);
    setState({ collapsed });
  };

const handleClick = e => {
  console.log('click ', e.domEvent.target.innerText);
  setHeaderText(e.domEvent.target.innerText)
  setMenuState({
    current: e.key,
  });
};
 
return (
  <div>
  
  {/* <AppHeader ></AppHeader> */}
  <Layout style={{ minHeight: '100vh', background: '#fff'}}>
    <Sider width='300px' collapsible collapsed={collapsed.collapsed} onCollapse={onCollapse} style={{ background: '#fff'}}>
        <div className="logo" />
        <div>
            <Menu
                onClick={handleClick}
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['bookerSub']}
                mode="inline"
                //theme="dark"
                inlineCollapsed={collapsed.collapsed}
            >
            <Menu.Item onClick={() => history.push('/')} icon={<HomeOutlined />} key="home">Home</Menu.Item>
            <SubMenu key="bookerSub" icon={<UserOutlined />}  title="Booker">
                <Menu.Item onClick={() => history.push('/profile')} icon={<UserOutlined />} key="1">My Profile</Menu.Item>
                <Menu.Item onClick={() => history.push('/subscriptions')} icon={<GoldOutlined />} key="2">My Subscriptions</Menu.Item>
                <Menu.Item onClick={() => history.push('/appointments')} icon={<ProfileOutlined />} key="3">My Appointments</Menu.Item>
                
                <Menu.Item onClick={() => history.push('/messages')} icon={<MailOutlined />} key="4"><Badge dot offset={[10, 10]}> Messages </Badge></Menu.Item>
                
            </SubMenu>
            <SubMenu key="sub2"  icon={<AppstoreOutlined />}  title="My entities">
                <Menu.Item onClick={() => history.push('/entity-overview')} icon={<AppstoreAddOutlined />} key="5">Entity overview</Menu.Item>
                
                {entities.map(entity =>
                    <SubMenu icon={<TeamOutlined />} key={entity['id']} title={entity['name']}>
                        <Menu.Item icon={<ProfileOutlined />} onClick={() => history.push(`/entity-overview/${entity['id']}`)}  key={entity['id']+'profile'}>Profile</Menu.Item>
                        <Menu.Item icon={<UnorderedListOutlined />}  key={entity['id']+'appos'}>Appointments</Menu.Item>
                        <Menu.Item icon={<ScheduleOutlined />} onClick={() => history.push('/templates')} key={entity['id']+'scheds'}>Schedules</Menu.Item>
                        <Menu.Item icon={<MessageOutlined />} key={entity['id']+'mess'}>Messages</Menu.Item>
                        <Menu.Item icon={<SettingOutlined />} key={entity['id']+'Sett'}>Settings</Menu.Item>
                    </SubMenu>
                )}
                {/* <Menu.Item key="10">Option 6</Menu.Item> */}
            </SubMenu>
            {/* <SubMenu key="sub4"  icon={<SettingOutlined />}  title="Preferencess"> */}
                <Menu.Item icon={<SettingOutlined />} key="11">Settings</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} key="12">Log out</Menu.Item>

            {/* </SubMenu> */}
            </Menu>
            </div>
      </Sider>

      <Layout className="site-layout" >
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }} >
        <PageHeader style={{paddingTop: 10, paddingBottom: 10}}
          className="site-page-header"
          onBack={() => history.goBack()}
          title={headerText}
          subTitle="This is a subtitle"
        />
          
          </Header>
          <Content
            className="site-layout-background"
            style={{ margin: '0 16px' }}
          >
          <Main></Main>
            
          </Content>
        </Layout>


  </Layout>
    
  </div>
);
}
)

export default App;
