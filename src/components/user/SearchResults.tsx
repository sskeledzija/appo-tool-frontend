import React, { useEffect, useState } from "react"
import { withRouter } from 'react-router-dom'
import EntityItem from "src/elements/entity/EntityItem"

export const SearchResults = withRouter((props) => {

    const [results, setSearchResults] = useState([])
    const target = props.match.params.id

    useEffect(() => {
        const searchForBookingEntities = () => {
            fetch('http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/user-entities/find?key=' + target,  {headers: {'Content-Type': 'application/json'}})
            .then(
             data => data.json())
            .then(jsonData => {
                setSearchResults(jsonData)
            }
            )
            .catch(
                reason => 
                console.log(reason)
                )
          }
          searchForBookingEntities();
    }, [target])

    if (results?.length>0) {
        return (
          <div >
            <div >
              <span className="card_title"> Search results</span>
              {
                results?.map(s =>  
                  <EntityItem key={s['id'+2]} entity={s} onClick={() => props.history.push('/subscriptions/'+s['id'])}></EntityItem>)}
            </div>            
          </div>
        )
      } else {
        return (
          <div>
            No Subscriptions found...
            {/*  <EntityDetails bookingEntity={subscriptionState?.editedItem?.bookingEntity}></EntityDetails> */}

        </div>
        )
      }
  }
)

export default SearchResults