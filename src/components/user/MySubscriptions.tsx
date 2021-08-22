import React, { useEffect, useState } from 'react';
//import './../../App.css';
import { withRouter } from 'react-router-dom'
import { useUserWorkshop } from '../store/UserStore';
import EntityProfile from 'src/elements/entity/EntityProfile';
import { useSubscriptionWorkshop } from '../store/SubscriptionStore';
import { Card, Col, Empty, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';


interface Sub{
  entity: any;
  userId: string
}

interface SubState {
  subscriptions: Sub[],
  isEdited: boolean,
  editedItem: Sub
}

const initSubscriptionState : SubState = {subscriptions: [], isEdited: false, editedItem: {userId: '', entity: undefined}}

export const SubscriptionsComponent = withRouter(({ history, match }) => {

  
  const [subscriptionState, setSubscriptionState] = useState(initSubscriptionState)
  const user = useUserWorkshop(state => state.user)
  const getUserSubscriptions = useSubscriptionWorkshop(state => state.getSubscriptions)
  
  useEffect(() => {

    const loadSubscriptions = async () => {
      setSubscriptionState({...subscriptionState, subscriptions: await getUserSubscriptions(user)})
    }

    if (user) {
      loadSubscriptions()
    }

  }, [user])

  const id = match?.params?.id
  if (id) {
    return <EntityProfile match={id} ></EntityProfile>
  }

  if (subscriptionState.subscriptions.length > 0) {
    return (
      <div style={{paddingTop: '20px'}}>

      <div className="site-card-wrapper">
          <Row gutter={16}>
            
            {subscriptionState?.subscriptions?.map(s => 
              <Col span={6} key={s['id']}> 
                <Card 
                  key={s[id]+1}
                  onClick={() => history.push('/subscriptions/'+s.entity.id)}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src="https://i.stack.imgur.com/l60Hf.png" />}>
                  <Meta title={s['entity']['name']} description={s['entity']['description']} />
                  
                </Card>
              </Col>)}
            
            
          </Row>
        </div>
      </div>
    )
      } else {
        return (          
          <>
            <br/>
            <Empty  description='No Subscriptions found...'/>
          </>
        )
      }

  }
)
export default SubscriptionsComponent
  
