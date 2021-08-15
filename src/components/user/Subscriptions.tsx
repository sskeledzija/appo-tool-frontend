import React from 'react';
import { SubscriptionItem } from 'src/elements/user/SubscriptionItem';
import EntityProfile from 'src/elements/entity/EntityProfile';
import { useSubscriptionWorkshop } from '../store/SubscriptionStore';

/* eslint-disable react/prop-types */
export const Subscriptions = ( props) => {
 
  const [subscriptions] = useSubscriptionWorkshop((state) => [state.subscriptions])
  const id = props.id

  if (id) {
    return <EntityProfile match={id} />
  }

       return  (    
        <div >
        <span className="card_title"> My Subscriptions</span>
          {
            subscriptions?.map(s =>  
              <SubscriptionItem key={s['id'+3]} subscription={s} onClick={props.onClick}></SubscriptionItem>)
          }
      </div>
      
    )
 
}