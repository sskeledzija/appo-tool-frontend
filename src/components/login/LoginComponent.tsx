import React, { useEffect, useState } from 'react';
import './login.css'
import { useUserWorkshop } from '../store/UserStore';
import { withRouter } from 'react-router-dom';
import { useSubscriptionWorkshop } from '../store/SubscriptionStore';

export const LoginComponent = withRouter(({history})  => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [user, setUser] = useUserWorkshop((state) => [state.user, state.setActiveUser])

    const handleusername = (e) => {
        setUsername(e.target.value)
    }

    const handlepassword = (e) => {
        setPassword(e.target.value)
    }

    const getSubscriptions = useSubscriptionWorkshop((state) => state.getSubscriptions)

    function setToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
        console.log("### SAVED token: " + token);
     }

     function getToken() {
        const t = localStorage.getItem('token')
        if (t)
          console.log("##### GOT token: " + t);
        return t
     }

    useEffect(() => {
        const token = getToken()
        if (token) {
            fetch('http://localhost:9999/login/token', 
            {
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                  "token": JSON.parse(token)
              })
             })
             .then(
                (response) => {
                    if (!response.ok) {
                        throw Error(response.status +': ' + response.json);
                    }
                    return response;
                }
             )
            .then(
                  data => data.json())
            .then(jsonDataUser => {
                setUser(jsonDataUser)
                setToken(jsonDataUser['token'])
                getSubscriptions(jsonDataUser)
                history.push('/')
              })
              .catch((e) => console.log("Error happend during geting user data: "  + e)
              )
        }
    }, [])
        //
        const loginUser =  (e) => {
            // remove any existing token
            localStorage.removeItem('token')
            e.preventDefault();
          fetch('http://localhost:9999/login', 
          {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "email": username,
                "password": password
            })
           })
           .then(
            (response) => {
                if (!response.ok) {
                    throw Error(response.status +': ' + response.json + ", description: " + response.statusText);
                }
                return response;
            }
            )
          .then(
                data => data.json())
          .then(jsonDataUser => {
            setUser(jsonDataUser)
            setToken(jsonDataUser['token'])
            getSubscriptions(jsonDataUser)
            history.push("/")
            })
            .catch((error) => {
                // TODO move to client and show error message notification
                console.error(error);
              
            })
        }
        
   //   }, [])

return (
    <div>
        <form method='post'>
            <div className="login-wrapper">
                <span >
                    Login
                </span>

                <div data-validate = "Username is required">
                    <span >Username</span>
                    <input onChange={handleusername} type="text" name="username" placeholder="Type your username"/>
                    <span data-symbol="&#xf206;"></span>
                </div>

                <div  data-validate="Password is required">
                    <span >Password</span>
                    <input onChange={handlepassword} type="password" name="pass" placeholder="Type your password"/>
                    <span data-symbol="&#xf190;"></span>
                </div>
                
                <div >
                    <a href="#">
                        Forgot password?
                    </a>
                </div>
                
                <div >
                    <div >
                        <div ></div>
                        <button onClick={loginUser}>
                            Login
                        </button>
                    </div>
                </div>

                <div >
                    <span>
                        Or Sign Up Using
                    </span>
                </div>

                <div >
                    <a href="#" >
                        <i className="fa fa-facebook"></i>
                    </a>

                    <a href="#" >
                        <i className="fa fa-twitter"></i>
                    </a>

                    <a href="#" >
                        <i className="fa fa-google"></i>
                    </a>
                </div>

                <div >
                    <span >
                        Or Sign Up Using
                    </span>

                    <button  onClick={() => history.push('/register')}  >
                        Sign Up
                    </button>
                </div>
            </div>
		</form>

    </div>
    )}
)

export default LoginComponent
