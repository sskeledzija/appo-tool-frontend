import { Button, Card, Col, Empty, Form, Input, Row, Select } from 'antd';
import Meta from 'antd/lib/card/Meta';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { useEntityOptionsWorkshop } from '../store/EntityOptionsStore';
import { useEntityWorkshop } from '../store/EntityStore';
import { useUserWorkshop } from '../store/UserStore';

const { Option } = Select;


export const EntityOverview = withRouter(({history}) => {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const user = useUserWorkshop((state ) => state.user)
  const [activityAreas, organizationTypes, lazyLoadOptions] = useEntityOptionsWorkshop(state => [state.activityAreas, state.organizationTypes, state.lazyLoadEntityOptions])
  const [userEntities, createUserEntity, getUserEntities] = useEntityWorkshop(state => [state.entities, state.createEntity, state.getUserEntities])

  const [regData, setRegData] = useState({name: '', user: {}, description: '', activityArea: {},
  organizationType: {}, street: user['address']['street'], postCode: user['address']['postCode'], 
  city: user['address']['city'], country: user['address']['country'], houseNr: user['address']['houseNr'], 
  addressLine2: user['address']['addressLine2'], email: user['email']['address'], phone: user['phone']})
  
  const resetRegData = () => {
    setRegData({name: '', user: {}, description: '', activityArea: {},
    organizationType: {}, street: user['address']['street'], postCode: user['address']['postCode'], 
    city: user['address']['city'], country: user['address']['country'], houseNr: user['address']['houseNr'], 
    addressLine2: user['address']['addressLine2'], email: user['email']['address'], phone: user['phone']})
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    };

  const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    function handleActivityChange(value) {
      console.log(`selected ${value}`);
      const activity = _.find(activityAreas, {'id': value})
      if (activity) {
        setRegData({...regData, activityArea: activity})
      }
    }

    function handleOrganizationChange(value) {
      console.log(`selected ${value}`);
      const organization = _.find(organizationTypes, {'id': value})
      if (organization) {
        setRegData({...regData, organizationType: organization})
      }
    }

    useEffect(() => {
      
        resetRegData()
        lazyLoadOptions(user);

        getUserEntities(user['id']);
     
    }, [activityAreas, organizationTypes])

  const showModal = () => {
    setVisible(true);
  };
  
  const handleCreateEntity = async () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);

    const result = await createUserEntity({
      user: user, name: regData.name, 
      description: regData.description,
      organizationType: regData.organizationType,
      activityArea: regData.activityArea,
      email: {
        address: regData.email,
        type: 'private'
      },
      address: { 
        street: regData.street,
        houseNr: regData.houseNr,
        postCode: regData.postCode,
        city: regData.city,
        country: regData.country,
        addressLine2: regData.addressLine2
      },
      phone: {
        number: regData.phone,
        type: 'private'
      }
    })

    if (result === null) {
      setConfirmLoading(false);
      return
    }
    setVisible(false);
    setConfirmLoading(false);
    resetRegData()

/*     setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000); */
  }
  
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  
  return (
    <>
    { userEntities.length > 0 &&
    
      <div style={{paddingTop: '20px'}}>

      <div className="site-card-wrapper">
          <Row gutter={16}>
            
            {userEntities?.map(s => 
              <Col span={6} key={s['id']}> 
                <Card 
                  key={s['id']+1}
                  onClick={() => history.push('/entity-overview/'+s['id'])}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src="https://i.stack.imgur.com/l60Hf.png" />}>
                  <Meta title={s['name']} description={s['description']} />
                  
                </Card>
              </Col>)}
          </Row>
        </div>
      </div>
      }
      <br/>
  { userEntities.length === 0 &&
                 
          <div>            
            <Empty  description="You don't have any entities yet..."/>
          </div>
        
      }

    <br></br>
    <Row>
        <Col offset={10} span={4}>
          <Button type="primary" onClick={showModal}>
            Add new Entity
          </Button>
        </Col>
      </Row>
      <Modal
        title="Create a new Entity"
        visible={visible}
        onOk={handleCreateEntity}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
         <Form
                name="newEntityForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                >

                <Form.Item
                        label="Entity name"
                        name="rentityname"
                        rules={[{ required: true, message: 'Please enter the entity name' }]}
                    >
                        <Input onChange={(e) => setRegData({...regData, name: e.target.value})} value={regData.name}/>
                </Form.Item>
                <Form.Item
                        label="Description"
                        name="rdescription"
                        rules={[{ required: true, message: 'Please enter the entity description' }]}
                    >
                        <TextArea rows={2} onChange={(e) => setRegData({...regData, description: e.target.value})} value={regData.description}/>
                </Form.Item>
                <Form.Item
                        label="Activity area"
                        name="ractivityArea"
                        rules={[{ required: true, message: 'Please enter the entity activity area' }]}
                    >
                        <Select onChange={handleActivityChange}>
                        {activityAreas.map(
                          aa => (<Option  value={aa['id']} key={aa['id']} >{aa['name'] + '-' + aa['description']}</Option>)
                        
                        )}

                      </Select>
                </Form.Item>
                <Form.Item
                        label="Organization type"
                        name="rorganizationtype"
                        rules={[{ required: true, message: 'Please enter the entity organization type' }]}
                    >
                      <Select onChange={handleOrganizationChange} >
                        {organizationTypes.map(
                          aa => (<Option value={aa['id']} key={aa['id']} >{aa['name']}</Option>)
                        )}

                      </Select>
                </Form.Item>
                <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ min: 6, message: 'Please input a phone number' }]}
                    >
                        <Input onChange={(e) => setRegData({...regData, phone: e.target.value})}  style={{ width: '100%' }} />
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
      </Modal>
    </>
  );
}
)
