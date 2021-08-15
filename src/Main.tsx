import { HashRouter, Route, Switch } from 'react-router-dom'
import BookerEntityComponent from './components/schedule/ScheduleComponent'
import SubscriptionsComponent from './components/user/MySubscriptions'
import EntityProfile from './elements/entity/EntityProfile'
import { SearchResults } from './components/user/SearchResults'
import { BookerHome } from './components/user/UserHome'
import { Logout } from './components/login/Logout'
import { useUserWorkshop } from './components/store/UserStore'
import GuardedRoute from './components/login/GuardedRoute'
import React, { useEffect, useState } from 'react'
import { MyProfile } from './components/user/MyProfile'
import { MyAppointments } from './components/user/MyAppointments'
import { MyMessages } from './components/user/MyMessages'


// noinspection JSUnusedLocalSymbols
export const Main = () => {
  // use i18n functions programatically in nested attributes
 // const intl = useIntl()
 const user = useUserWorkshop((state) => state.user)

 const [isAuthenticated, setAuthenticated] = useState(user !== undefined)

    function checkAuthenticated() { 
      setAuthenticated(user !== undefined)
    
    }

    useEffect(() => {
        checkAuthenticated()
    }, [user])

    // if(user === undefined) {
    //   return <LoginComponent />
    // }


  return (
    <div >
     
      <HashRouter>
        <Switch>
   
          <GuardedRoute exact={true} path="/" component={BookerHome} auth={isAuthenticated}/>
          <GuardedRoute exact={true} path="/subscriptions" component={SubscriptionsComponent} auth={isAuthenticated}/>
          <GuardedRoute path="/appointments" component={MyAppointments} auth={isAuthenticated}/>
          <GuardedRoute path="/messages" component={MyMessages} auth={isAuthenticated}/>
          <Route path="/profile" component={MyProfile} />
          <Route path="/logout" component={Logout} />
          <GuardedRoute path="/booker-entity" component={BookerEntityComponent} auth={isAuthenticated}/>
          <GuardedRoute path="/subscriptions/:id" component={EntityProfile} auth={isAuthenticated} />
          <GuardedRoute path="/search/:id" component={SearchResults} auth={isAuthenticated}/>
          
        </Switch>
      </HashRouter>
    </div>
  )
}
