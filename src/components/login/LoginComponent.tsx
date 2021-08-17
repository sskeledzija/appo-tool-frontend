import React, { useEffect, useState } from 'react';
import './login.css'
import { useUserWorkshop } from '../store/UserStore';
import { withRouter } from 'react-router-dom';
import { useSubscriptionWorkshop } from '../store/SubscriptionStore';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

export const LoginComponent = withRouter(({history})  => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [user, setUser] = useUserWorkshop((state) => [state.user, state.setActiveUser])

    const handleusername = (e) => {
        setUsername(e.target.value)
    }

    const handlepassword = (e) => {
        setPassword(e.target.value)
    }

    const getSubscriptions = useSubscriptionWorkshop((state) => state.getSubscriptions)

    function setToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
        console.log("### SAVED token: " + token);
     }

     function getToken() {
        const t = localStorage.getItem('token')
        if (t)
          console.log("##### GOT token: " + t);
        return t
     }

    useEffect(() => {
        const token = getToken()
        if (token) {
            fetch('http://localhost:9999/login/token', 
            {
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                  "token": JSON.parse(token)
              })
             })
             .then(
                (response) => {
                    if (!response.ok) {
                        throw Error(response.status +': ' + response.json);
                    }
                    return response;
                }
             )
            .then(
                  data => data.json())
            .then(jsonDataUser => {
                setUser(jsonDataUser)
                setToken(jsonDataUser['token'])
                getSubscriptions(jsonDataUser)
                history.push('/')
              })
              .catch((e) => console.log("Error happend during geting user data: "  + e)
              )
        }
    }, [])
        //
        const loginUser =  (e) => {
            // remove any existing token
            localStorage.removeItem('token')
            e.preventDefault();
          fetch('http://localhost:9999/login', 
          {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "email": username,
                "password": password
            })
           })
           .then(
            (response) => {
                if (!response.ok) {
                    throw Error(response.status +': ' + response.json + ", description: " + response.statusText);
                }
                return response;
            }
            )
          .then(
                data => data.json())
          .then(jsonDataUser => {
            setUser(jsonDataUser)
            setToken(jsonDataUser['token'])
            getSubscriptions(jsonDataUser)
            history.push("/")
            })
            .catch((error) => {
                // TODO move to client and show error message notification
                console.error(error);
              
            })
        }
        
   //   }, [])

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
                        <Button onClick={loginUser} type="primary" className="login-form-button" >
                        Log in
                        </Button>
                        Or <a style={{color: 'DodgerBlue '}} onClick={() => history.push('/register')}>register now! </a>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
            <FontAwesomeIcon icon={['fab', 'apple']} />














        {/* <form method='post'>
            <div className="login-wrapper">
                <span >
                    Login
                </span>

                <div data-validate = "Username is required">
                    <span >Username</span>
                    <input onChange={handleusername} type="text" name="username" placeholder="Type your username"/>
                    <span data-symbol="&#xf206;"></span>
                </div>

                <div  data-validate="Password is required">
                    <span >Password</span>
                    <input onChange={handlepassword} type="password" name="pass" placeholder="Type your password"/>
                    <span data-symbol="&#xf190;"></span>
                </div>
                
                <div >
                    <a href="#">
                        Forgot password?
                    </a>
                </div>
                
                <div >
                    <div >
                        <div ></div>
                        <button onClick={loginUser}>
                            Login
                        </button>
                    </div>
                </div>

                <div >
                    <span>
                        Or Sign Up Using
                    </span>
                </div>

                <div >
                    <a href="#" >
                        <i className="fa fa-facebook"></i>
                    </a>

                    <a href="#" >
                        <i className="fa fa-twitter"></i>
                    </a>

                    <a href="#" >
                        <i className="fa fa-google"></i>
                    </a>
                </div>

                <div >
                    <span >
                        Or Sign Up Using
                    </span>

                    <button  onClick={() => history.push('/register')}  >
                        Sign Up
                    </button>
                </div>
            </div>
		</form> */}

    </div>
    )}
)

export default LoginComponent
