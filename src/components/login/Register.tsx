import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserWorkshop } from '../store/UserStore'

export const Register = withRouter(({history}) => {
    
    const [userName, setName] = useState("")
    const [userLastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, registerUser, setUser] = useUserWorkshop((state ) => [state.user, state.registerUser, state.setActiveUser])

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    function setToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
        console.log("### SAVED token: " + token);
    }


const register = async () => {

    await registerUser({      
        "emailAddress": email,
        "user": {
              "name": userName,
              "lastName": userLastName,
              "email": { "address" : email , "type" : "private" },
              "password": password
          }
    }). then((result) => {
        setToken(result['token']);
        history.push('/');
    }).catch((err) => {
        console.log('error: ' + err );
        
    });

}

    return (
        <div>
        <form  className="logreg">

            <label >First name:</label>
            <input onChange={handleName} type="text" id="fname" placeholder="first name"/> 

            <label >Last name:</label>
            <input onChange={handleLastName} type="text" id="lname" placeholder="last name"/> 

            <label>Email:</label>
            <input onChange={handleEmail} type="email" id="email" placeholder="enter email"/> 

            <label >password:</label>
            <input onChange={handlePassword} type="password" id="password" placeholder="enter password"/> 
            <button onClick={register} >Register</button>
        </form>
  </div>
    );
}
)