import React, { useEffect, useState } from 'react';
import { useEntityWorkshop } from 'src/components/store/EntityStore';
import { useSubscriptionWorkshop } from 'src/components/store/SubscriptionStore';
import { useUserWorkshop } from 'src/components/store/UserStore';

export const EntityProfile = ({match}) => {

        
//const initialstate = {loaded: false, entity: {name: '', description: '', address: {street: '', city: '', 
//country: '', postCode: '', houseNr: ''}, phone: {number: ''}, email: {address: ''}}}
  const [state, setEntity] = useState({loaded: false, entity: {}})
  const user = useUserWorkshop((state) => state.user)
  const [addSubscription, removeSubscription, isSubscribed, getSubscriptions] = useSubscriptionWorkshop((state) => 
        [state.addSubscription, state.removeSubscription, state.isSubscribed, state.getSubscriptions])
  const getEntity = useEntityWorkshop((state) => state.getEntity)
  const id = match.params.id

  const subscribeUser = () => {
    addSubscription(user, state.entity)
  }
  
  const unsubscribeUser = () => {
    removeSubscription(user, state.entity);
  }

  useEffect(() => {
    const fetchSubscriptionById = async () => {

        getSubscriptions(user)

        const entity = await getEntity(id)
        
        setEntity({loaded: true, entity: entity}) ;

      }
  
      fetchSubscriptionById();
  }, 
  [])

  if (state.loaded) {
    return (
        <div>
            <div>
                <span className="card_title"> {state.entity['name']}</span>
            </div>
            
            {/* <div className="entity_details">
                <div >
        
                <span className="entity_label">Name </span>
                <span className="entity_value">{props.bookingEntity.name}</span>
            
                </div>
            </div> */}

            <div className="entity_details">
                <div >
        
                <span className="entity_label">Description: </span>
                <span className="entity_value">{state.entity['description']}</span>
            
                </div>
            </div>

            <div className="entity_details">
                <div >
        
                <span className="entity_label">Address: </span>
                <span className="entity_value">{state.entity['address']['street']}, {state.entity['address']['houseNr']},{state.entity['address']['postCode']},{state.entity['address']['city']}</span>
            
                </div>
            </div>

            <div className="entity_details">
                <div >
        
                <span className="entity_label">Phone: </span>
                <span className="entity_value">{state.entity['phone']['number']}</span>
            
                </div>
            </div>

            <div className="entity_details">
                <div >            
                    <span className="entity_label">Email: </span>
                    <span className="entity_value">{state.entity['email']['address']}</span>
                </div>
            </div>
            <div>
                 { (isSubscribed(id)) && 
                   <button onClick={unsubscribeUser}>Unsubscribe</button> }
                { (!isSubscribed(id)) && 
                   <button onClick={subscribeUser}>Subscribe</button> }
            </div>
        </div>
    );
        } else {
            return (
            <div>404 Subscriptions not found</div>
            )
        }


  }

  export default EntityProfile
  
