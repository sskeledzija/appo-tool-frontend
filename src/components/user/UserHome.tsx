
import React from 'react';
import { withRouter } from 'react-router-dom'
import LoginComponent from '../login/LoginComponent';
import { useUserWorkshop } from '../store/UserStore';
import 'antd/dist/antd.css';

export const BookerHome = withRouter(({history}) => {

    const user = useUserWorkshop(state => state.user);
    
    if(user === undefined) {
        return <LoginComponent />
    }

    return (
        
        <div>
            <div> <h2> Wellcome {user['name']}!</h2> </div>
            <br/>
            <hr/>
            <div>Choose your options</div>
            <hr/>
            
            <div>
               Option 1
            </div>
            <div>
               Option 2
            </div>

        </div>

    )
}
)
