import React from "react";
import { UserOutlined } from "@ant-design/icons"
import { Col, Row } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { useUserWorkshop } from '../store/UserStore';

export const MyProfile = () => {

    const user = useUserWorkshop(state => state.user)

    return (<>
    <Row style={{paddingTop: '20px'}}>
        <Col span={10} />
        <Col span={4} >
            <a href='#'>
            <Avatar size={64} icon={<UserOutlined />}></Avatar>
            </a>
        </Col>
    </Row>
    <br></br>
    <Row >
        <Col span={6} />
        <Col span={10} >
            <hr />
        </Col>
    </Row>
    <br></br>
    <Row>
        <Col span={7} />
        <Col span={4}>First name:</Col>
        <Col span={4}><input value={user['name']} style={{width: '100%'}}></input> </Col>
    </Row>
    <Row>
        <Col span={7} />
        <Col span={4}>Last name:</Col>
        <Col span={4}><input value={user['lastName']} style={{width: '100%'}}></input> </Col>
    </Row>
    <Row>
        <Col span={7} />
        <Col span={4}>Email:</Col>
        <Col span={4}><input value={user['email']['address']} style={{width: '100%'}}></input> </Col>
    </Row>
    </>)
}