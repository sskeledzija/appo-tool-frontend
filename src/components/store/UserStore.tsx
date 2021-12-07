import { message } from 'antd';
import axios from 'axios';
import create from 'zustand'

type UserStore = {
    user: any;
    token: any;
    login: (user, password) => any;
    loginWithToken: (token) => any;
    registerUser: (user) => any;
    setActiveUser: (user) => void;
    logout: () => void;
  };

export const useUserWorkshop = create<UserStore>((set, get) => ({
    user: undefined,
    token: undefined,
    login: async (email, password) => {
        const response = await axios.post('http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/login', 
            {email: email, password: password}).catch(
                e => {
                    message.error("UPS! Something went wrong with user login: " + e, 3)
                    return null
                }
            );
       
        get().setActiveUser(response?.data);
        
       if (response !== null) {
           message.success('User ' + get().user['name']+ ' was succesfully logged in! ', 3)
       }
       return get().user;    
        
    },
    loginWithToken: async (token) => {
        const response = await axios.post('http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/login/token', 
            { token: token }).catch(
                e => {
                    message.error("UPS! Something went wrong with user login: " + e, 3)
                    return null
                }
            );
       
        get().setActiveUser(response?.data);
        
       if (response !== null) {
           message.success('User ' + get().user['name']+ ' was succesfully logged in! ', 3)
       }
       return get().user;    
        
    },
    registerUser: async (user) => {
        const response = await axios.post('http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/login/register', 
            {...user}).catch(
                e => {
                    message.error("UPS! Something went wrong with user registration: " + e, 3)
                    return null
                }
            );
       
        get().setActiveUser(response?.data);
        
       if (response !== null) {
           message.success('User ' + user['name']+ ' was succesfully created! ', 3)
       }
       return get().user;    
        
    },
    setActiveUser: (u) => 
        set({user: u}),
    logout: () => 
        set({user: undefined}),
  }))

  