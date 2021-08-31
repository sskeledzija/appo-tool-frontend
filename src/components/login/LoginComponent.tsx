import React, { useEffect, useState } from 'react';
import './login.css'
import { useUserWorkshop } from '../store/UserStore';
import { withRouter } from 'react-router-dom';
import { useSubscriptionWorkshop } from '../store/SubscriptionStore';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useEntityWorkshop } from '../store/EntityStore';

export const LoginComponent = withRouter(({history})  => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [user, login, loginWithtoken] = useUserWorkshop((state) => [state.user, state.login, state.loginWithToken])
    const getUserEntities = useEntityWorkshop(state => state.getUserEntities)

    const handleusername = (e) => {
        setUsername(e.target.value)
    }

    const handlepassword = (e) => {
        setPassword(e.target.value)
    }

    const getSubscriptions = useSubscriptionWorkshop((state) => state.getSubscriptions)

    const setToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        console.log("### SAVED token: " + token);
     }

     const getToken = () => {
        const t = localStorage.getItem('token')
        if (t)
          console.log("##### GOT token: " + t);
        return t
     }

     const reloginWithToken = async (token) => {
        const loggedUser = await loginWithtoken(JSON.parse(token));
        loadUserResourcesAndRedirect(loggedUser);
    }

    useEffect(() => {
       
        const token = getToken()
        if (user === undefined && token !== 'undefined' && token !== null) {
            reloginWithToken(token);
        }
    }, [])
        //
        const loginUser =  async (e) => {
            if(!username || !password) {
                return
            }
            message.loading('Getting user data...', 1)
            // remove any existing token
            localStorage.removeItem('token')

            const loggedUser = await login(username, password)
            loadUserResourcesAndRedirect(loggedUser);
            
        }

        const loadUserResourcesAndRedirect = (user) => {
            setToken(user['token'])
            getSubscriptions(user)
            getUserEntities(user['id'])
            
            history.push("/")
        }

return (
    <div>
        <Row >
            <Col span={9}></Col>
            <Col span={5}>
                <Form
                    style={{paddingTop: '60px'}}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    >
                   
                   <Col span={24} ><div style={{width: '100%', textAlign: 'center'}}><h3> Login </h3></div> </Col>

                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please enter your Username or email!' }]}
                    >
                        <Input onChange={handleusername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your Password!' }]}
                    >
                        <Input.Password onChange={handlepassword}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                   
                   <Col span={24} ><div style={{width: '100%', textAlign: 'center'}}><small> Or with </small></div> </Col>
                   
                   <Form.Item className='social-button'>
                        <Button style={{width: '100%'}} >
                            <FontAwesomeIcon icon={faGoogle} />
                        </Button>
                    </Form.Item>
                    <Form.Item className='social-button'>
                        <Button style={{width: '100%'}} >
                            <FontAwesomeIcon icon={faFacebook} />
                        </Button>
                    </Form.Item>

                    <Form.Item className='social-button'>
                        <Button style={{width: '100%'}} >
                        <FontAwesomeIcon icon={faTwitter} />
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                        Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={loginUser} htmlType='submit' type="primary" className="login-form-button" >
                            
                        Log in
                        </Button>
                        {/* <button type='submit'>suubbb</button> */}
                        Or <a style={{color: 'DodgerBlue '}} onClick={() => history.push('/register')}>register now! </a>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
            
    </div>
    )}
)

export default LoginComponent
