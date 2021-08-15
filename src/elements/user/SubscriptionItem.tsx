import React from 'react';
import './subscriptions.css'

/* eslint-disable react/prop-types */

export const SubscriptionItem = (props) => {

  /* 
  const openItem = () => {
    setS
  } */

    return (
       <div >
         <button  onClick={() =>props.onClick(props.subscription)} className="items_box">
        
           <span className="tile_title">{props.subscription.bookingEntity.name} </span>
           
           <span className="tile_details">{props.subscription.bookingEntity.description}, {props.subscription.bookingEntity.address.street}, {props.subscription.bookingEntity.address.city}</span>
        
         </button>
      </div>
    )
  }

  export default SubscriptionItem;
  
