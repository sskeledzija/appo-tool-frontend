import { message } from 'antd';
import axios from 'axios';
import create from 'zustand'

type UserStore = {
    user: any;
    token: any;
    registerUser: (user) => any
    setActiveUser: (user) => void;
    logout: () => void;
  };

export const useUserWorkshop = create<UserStore>((set, get) => ({
    user: undefined,
    token: undefined,
    registerUser: async (user) => {
        const response = await axios.post('http://localhost:9999/login/register', 
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

  