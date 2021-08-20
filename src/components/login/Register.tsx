import { Col, Row, Select, Switch} from 'antd'
import { Form, Input, Button, Checkbox } from 'antd';
import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserWorkshop } from '../store/UserStore'
import { Fieldset } from 'primereact/fieldset';
import { Option } from 'antd/lib/mentions';

export const Register = withRouter(({history}) => {
    
    const [gaveConsent, setConsentGiven] = useState(true)
    const [termsAccepted, setTermsAccepted] = useState(true)
    const [regData, setRegData] = useState({name: '', lastName: '', email: '', password: '',
        phone: '', street: '', postCode: '', city: '', country: '', houseNr: '', addressLine2: ''})
    const [user, registerUser] = useUserWorkshop((state ) => [state.user, state.registerUser])

    function setToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
        console.log("### SAVED token: " + token);
    }

    const onConsentChange = (checked) => {
        console.log(`switch cosnent to ${checked}`);
        setConsentGiven(checked);
    }
    const onTermsChange = (checked) => {
        console.log(`switch to ${checked}`);
        setTermsAccepted(checked);
    }

    const register = async () => {

      const user = await registerUser({      
            "emailAddress": regData.email,
            "user": {
                "name": regData.name,
                "lastName": regData.lastName,
                "email": { "address" : regData.email , "type" : "private", consent: { gaveConsent: gaveConsent } },
                "address": {"street": regData.street, "houseNr": regData.houseNr, "addresLine2": regData.addressLine2, "postCode": regData.postCode, "city": regData.city, "country": regData.country, consent: { gaveConsent: gaveConsent } },
                "password": regData.password
            }
        })

        if (!user) {
            return
        }
           
        setToken(user['token']);
        history.push('/welcome');

    }

    const onFinish = (values: any) => {
    console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }} >
            <Option value="43">+43</Option>
            <Option value="49">+49</Option>
            <Option value="385">+385</Option>
            <Option value="0">Custom</Option>
          </Select>
        </Form.Item>
      );

  return (
        <>
        {/* <Layout> */}
            {/* <Content > */}
            <Row style={{paddingTop:'20px'}}>
                <Col span={9} />
                    <h4>Register</h4>
            </Row>
            <Row >
                <Col span={8} />
                    <p>Please enter your registration details</p>
            </Row>
            <Row style={{paddingBottom:'15px'}}>
                <Col span={6} />
                    <small>You can make a quick registration now and finish it later, or you make a complete registration now.</small>
            </Row>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 6 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >

                <Form.Item
                        label="Name"
                        name="rusername"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                        <Input onChange={(e) => setRegData({...regData, name: e.target.value})} value={regData.name}/>
                </Form.Item>
                
                <Form.Item
                        label="Last name"
                        name="ruserlastname"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input onChange={(e) => setRegData({...regData, lastName: e.target.value})} value={regData.lastName} />
                </Form.Item>

                <Form.Item
                        label="Email"
                        name="ruseremail"
                        rules={[{type:'email', required: true, message: 'Please enter your e-mail' }]}
                    >
                    <Input onChange={(e) => setRegData({...regData, email: e.target.value})} value={regData.email} />
                </Form.Item>
                
                <Form.Item
                    label="Password"
                    name="ruserpassword"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password onChange={(e) => setRegData({...regData, password: e.target.value})} value={regData.password} />
                </Form.Item>
                <Row >
                    <Col span={4} />
                    <Col span={11} >

                       <Fieldset legend='Make a full registration' toggleable collapsed transitionOptions={{setTimeout: 500}}>
                            <Form name="extended"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 13 }}
                            >
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ min: 6, message: 'Please input a phone number' }]}
                                >
                                    <Input onChange={(e) => setRegData({...regData, phone: e.target.value})} addonBefore={prefixSelector} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    name="addressline1"
                                    label="Address line 1"
                                    rules={[{min: 3, message: 'Please input a street name' }]}
                                    >
                                    <Input onChange={(e) => setRegData({...regData, street: e.target.value})} value={regData.street} placeholder ='Street' style={{ width: '80%' }} />
                                    <Input onChange={(e) => setRegData({...regData, houseNr: e.target.value})} value={regData.houseNr} placeholder ='H.Nr.' style={{ width: '20%' }} />
                                    
                                </Form.Item>
                                <Form.Item
                                    name="addressline2"
                                    label="Address line 2"
                                    >
                                    <Input onChange={(e) => setRegData({...regData, addressLine2: e.target.value})} value={regData.addressLine2} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    name="postcode"
                                    label="Postal code"
                                    rules={[{min: 3, message: 'Please input a post number' }]}
                                    >
                                    <Input onChange={(e) => setRegData({...regData, postCode: e.target.value})} value={regData.postCode} style={{ width: '50%' }} />
                                </Form.Item>
                                <Form.Item
                                    name="city"
                                    label="City"
                                    rules={[{min: 3, message: 'Please input a City' }]}
                                    >
                                    <Input onChange={(e) => setRegData({...regData, city: e.target.value})} value={regData.city} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    name="country"
                                    label="Country"
                                    rules={[{min: 3, message: 'Please enter a Country' }]}
                                    >
                                    <Input onChange={(e) => setRegData({...regData, country: e.target.value})} value={regData.country} style={{ width: '100%' }} />
                                </Form.Item>
                            </Form>
                            
                       </Fieldset>
                       
                    </Col>
                </Row>

                
                <Row>
                    <Col span={3}/>
                    <Col span={1}>
                        <Switch defaultChecked onChange={onTermsChange} /> 
                    </Col>
                    <Col span={19}>
                        <small >By clicking the Register button you confirm that you accept our Terms of Use. How we cookies and similar technology, you can find out in the Cookie Use Policy. You can receive our notifications via e-mail, but you can always turn off this feature.</small>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}/>
                    <Col span={1}>
                        <Switch defaultChecked onChange={onConsentChange} /> 
                    </Col>
                    <Col span={19}>
                        <small>Yes, I would like to receive product informations and updates from this application (Optional)</small>
                    </Col>
                </Row>
                <Row style={{padding: '15px'}}>
                    <Col span={13}></Col>
                    <Col span={4}>
                        <Button type='primary' size='large' onClick={register} disabled={!termsAccepted}>Register</Button>
                    </Col>
                </Row>
            </Form>
        
            {/* </Content> */}

        {/* </Layout> */}
  </>
    );
}
)