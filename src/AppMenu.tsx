
import { useState } from 'react';
import { withRouter } from 'react-router-dom'
import LoginComponent from './components/login/LoginComponent';
import { useUserWorkshop } from './components/store/UserStore';
import 'antd/dist/antd.css';
import { Menu, Button } from 'antd';
import React from 'react';
import { SettingOutlined, 
    MenuUnfoldOutlined, 
    MenuFoldOutlined,
    MailOutlined,
    AppstoreOutlined, 
    ProfileOutlined,
    GoldOutlined,
    UserOutlined,
    AppstoreAddOutlined,
    ScheduleOutlined,
    MessageOutlined,
    TeamOutlined} from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';

const { SubMenu } = Menu;

export const AppSideMenu = withRouter((props) => {

    const user = useUserWorkshop(state => state.user);
    const [collapsedState, setCollapsedState] = useState({collapsed: false})
    const [state, setState] = useState({current: '1'});
    
    // if(user === undefined) {
    //     return <LoginComponent />
    // }


    const toggleCollapsed = () => {
        setCollapsedState({
          collapsed: !collapsedState.collapsed,
        });
        console.log(JSON.stringify(props));
         
      };
    
      const handleClick = e => {
        console.log('click ', e);
        setState({...state, 
          current: e.key,
        });
      };

     // const colla = collapsedState;
    return (
        <>
        <br />
        
    </>
     // </>
        
        // <div>
        //     <div> <h2> Wellcome {user['name']}!</h2> </div>
        //     <br/>
        //     <hr/>
        //     <div>Choose your options</div>
        //     <hr/>
            
        //     <div>
        //         <button type="button" onClick={() => history.push('/subscriptions')} > My Subscripitons</button>
        //     </div>
        //     <div>
        //         <button type="button" onClick={() => history.push('/')} > My Bookings</button>
        //     </div>

        // </div>


    )
}
)

export default AppSideMenu