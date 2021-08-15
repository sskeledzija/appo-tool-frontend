import React from 'react';
import '../user/subscriptions.css'

/* eslint-disable react/prop-types */

export const EntityItem = (props) => {

    return (
       <div >
         <button  onClick={() =>props.onClick(props.entity)} className="items_box">
        
           <span className="tile_title">{props.entity.name} </span>
           <span className="tile_details">{props.entity.description}, {props.entity.address.street}, {props.entity.address.city}</span>
        
         </button>
      </div>
    )
  }

  export default EntityItem;
  
