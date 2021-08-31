import React, { useEffect, useState } from 'react';
//import './../../App.css';
import { withRouter } from 'react-router-dom'
import { useUserWorkshop } from '../store/UserStore';
import { Button, Card, Col, Collapse, Empty, Row, Tag, TimePicker } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useScheduleWorkshop } from '../store/ScheduleStore';
import Modal from 'antd/lib/modal/Modal';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';


interface Period{
  id: string,
  from: string; // it is better to use string because expeced data type from backend is also a string in fomrat 'hh:mm'
  to: string
}

export const SchedulesComponent = withRouter(({ history, match }) => {

  const initialPeriodList: Period [] = []
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addHoursVisible, setAddHoursVisible] = useState(false);
  const user = useUserWorkshop(state => state.user)
  const [templates, createTemplate] = useScheduleWorkshop(state => [state.templates, state.createTemplate])
  const [periods, setPeriods] = useState({monday: initialPeriodList, 
      tuesday: initialPeriodList, wednesday: initialPeriodList, thursday: initialPeriodList, friday: initialPeriodList,
      saturday: initialPeriodList, sunday: initialPeriodList})
  const [editPeriod, setEditPeriod] = useState({id: '', from: '', to: ''})
  const [activeDay, setActiveDay] = useState('')
  
  // useEffect(() => {

  //   const loadSubscriptions = async () => {
  //     setSubscriptionState({...subscriptionState, subscriptions: await getUserSubscriptions(user)})
  //   }

  //   if (user) {
  //     loadSubscriptions()
  //   }

  // }, [user])

  const showModal = () => {
    setVisible(true);
  };

  const showAddHoursModal = (e, day) => {
    setActiveDay(day)
    setEditPeriod({...editPeriod, from: '06:00', to: '12:00'})
    console.log(`###################### ${JSON.stringify(editPeriod)}`);
    
    setAddHoursVisible(true);
    console.log(`event: ${e} , day: ${day}`);
    
  };

  const showEditHoursModal = (e, day, period: Period) => {
    setActiveDay(day)
    setEditPeriod({id: period.id, from: period.from, to: period.to})
    
    setAddHoursVisible(true);
    console.log(`event: ${e} , day: ${day}`);
    
  };

  const removePeriod = (e, day, period: Period) => {

    let updatedDayPeriods: Period[] = periods[day]
    updatedDayPeriods = _.reject(updatedDayPeriods, {id: period.id})
    setPeriods({...periods, [activeDay]: updatedDayPeriods})
 
  }

  const handleScheduleTemplate = async () => {
    setConfirmLoading(true);

    // const result = await createUserEntity({
    //   user: user, name: regData.name, 
    //   description: regData.description,
    //   organizationType: regData.organizationType,
    //   activityArea: regData.activityArea,
    //   email: {
    //     address: regData.email,
    //     type: 'private'
    //   },
    //   address: { 
    //     street: regData.street,
    //     houseNr: regData.houseNr,
    //     postCode: regData.postCode,
    //     city: regData.city,
    //     country: regData.country,
    //     addressLine2: regData.addressLine2
    //   },
    //   phone: {
    //     number: regData.phone,
    //     type: 'private'
    //   }
    // })

    // if (result === null) {
    //   setConfirmLoading(false);
    //   return
    // }
    // setVisible(false);
    // setConfirmLoading(false);
    // resetRegData()

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  }

  const handleAddOpenHours = async () => {
 
    // edit existing period
    if (editPeriod.id.length > 0) {
      let updatedDayPeriods: Period[] = periods[activeDay]
      updatedDayPeriods = updatedDayPeriods.map(p => p.id === editPeriod.id? {...p, from: editPeriod.from, to: editPeriod.to} : p 
    )

      setPeriods({...periods, [activeDay]: updatedDayPeriods})
    } else {
      // create new period 
      setPeriods({...periods, [activeDay]: [...periods[activeDay], {id: uuidv4(), from: editPeriod.from, to: editPeriod.to}]})
    }
    
    setAddHoursVisible(false);
    setEditPeriod( {...editPeriod, id: ''})
    
  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const handleCancelAddHours = () => {
    console.log('Clicked cancel button');
    setAddHoursVisible(false);
  };

  const handleFromHours = (time, timestring) => {
      console.log(`'from' time set  ${time} (${timestring})`);
      setEditPeriod({...editPeriod, from: timestring})
      
  }

  const handleToHours = (time, timestring) => {
    console.log(`'to' time set  ${time} (${timestring})`);
    setEditPeriod({...editPeriod, to: timestring})
    
  }

  const renderTags = (openPeriods: any[], day) => {

    return (
      <>
      {openPeriods.map(period => 
        <Tag style={{verticalAlign: 'revert !important'}}  icon={<ClockCircleOutlined/>} closable key={period['id']} onClose={e => removePeriod(e, day, period)}>
          <Button size="small" type="link"  onClick={e => showEditHoursModal(e, day, period)} >
            <p> 
              {period['from']} - {period['to']}
            </p>
          </Button>
        </Tag>
         
      )}
      {openPeriods.length > 0 && <Button size="small" type="primary" onClick={e => showAddHoursModal(e, day)}>Add</Button>}
      {openPeriods.length === 0 && 
      <Empty description="No working hours created">
        <Button onClick={(e) => showAddHoursModal(e, day)} size="small" type="primary">Add</Button>
      </Empty>}
      
      </>
    )
  }

  return (
  <>
  {(templates.length > 0) &&
    
      <div style={{paddingTop: '20px'}}>

      <div className="site-card-wrapper">
          <Row gutter={16}>
            
            {templates.map(template => 
              <Col span={6} key={template['id']}> 
                <Card 
                  key={template['id']+1}
                  onClick={() => history.push('/subscriptions/'+template)}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src="https://i.stack.imgur.com/l60Hf.png" />}>
                  <Meta title={template['entity']['name']} description={template['entity']['description']} />
                  
                </Card>
              </Col>)}
            
            
          </Row>
        </div>
      </div>}
   
   {(templates.length === 0) &&          
          <>
            <br/>
            <Empty  description='No Schedule Templates found...'/>
          </>
        
      }
   
      <Row>
        <Col offset={10} span={4}>
          <Button type="primary" onClick={showModal}>
            Add new Template
          </Button>
        </Col>
      </Row>

      <Modal 
        key="templateModal"
        title="Create a new Schedule"
        visible={visible}
        onOk={handleScheduleTemplate}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
            <Modal 
              key="hoursModal"
              title="Add new open hours"
              visible={addHoursVisible}
              onOk={handleAddOpenHours}
              onCancel={handleCancelAddHours}
            >
              <Row>
                <Col  span={5}>Working hours: </Col>
                <TimePicker  value={moment(editPeriod.from, 'HH:mm')}  minuteStep={5} onChange={handleFromHours} defaultValue={moment('06:00', 'HH:mm')} format={'HH:mm'} /> 
                <Col offset={1} span={1}>-</Col>
                <TimePicker /* value={updatePeriod.to} */  minuteStep={5} onChange={handleToHours} defaultValue={moment('12:00', 'HH:mm')} format={'HH:mm'} />
              </Row>
            </Modal>
 
      <Collapse accordion defaultActiveKey={['1']} /* onChange={callback} */>
        <CollapsePanel style={{verticalAlign: 'revert !important'}} header={'Monday' + (periods.monday.length>0? ' (' + periods.monday.map(p => p.from + '-' + p.to)+')' : '')} key="1">
          {renderTags(periods.monday, 'monday')}
        </CollapsePanel>
        <CollapsePanel header={'Tuesday' + (periods.tuesday.length>0? ' (' + periods.tuesday.map(p => p.from + '-' + p.to)+')' : '')} key="2">
          {renderTags(periods.tuesday, 'tuesday')}
        </CollapsePanel>
        <CollapsePanel header={'Wednesday' + (periods.wednesday.length>0? ' (' + periods.wednesday.map(p => p.from + '-' + p.to)+')' : '')} key="3">
          {renderTags(periods.wednesday, 'wednesday')}
        </CollapsePanel>
        <CollapsePanel header={'Thursday' + (periods.thursday.length>0? ' (' + periods.thursday.map(p => p.from + '-' + p.to)+')' : '')} key="4">
          {renderTags(periods.thursday, 'thursday')}
        </CollapsePanel>
        <CollapsePanel header={'Friday' + (periods.friday.length>0? ' (' + periods.friday.map(p => p.from + '-' + p.to)+')' : '')} key="5">
          {renderTags(periods.friday, 'friday')}
        </CollapsePanel>
        <CollapsePanel header={'Saturday' + (periods.saturday.length>0? ' (' + periods.saturday.map(p => p.from + '-' + p.to)+')' : '')} key="6">
          {renderTags(periods.saturday, 'saturday')}
        </CollapsePanel>
        <CollapsePanel header={'Sunday' + (periods.sunday.length>0? ' (' + periods.sunday.map(p => p.from + '-' + p.to)+')' : '')} key="7">
          {renderTags(periods.sunday, 'sunday')}
        </CollapsePanel>
      </Collapse>

      </Modal>
    
      </>
  )
  }
)
export default SchedulesComponent
  
