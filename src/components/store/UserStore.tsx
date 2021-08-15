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
            {...user});
       
        get().setActiveUser(response.data);
        
       if (response.status != 201) {
            console.log("something went wrong with getting of user: " + response.statusText);
       }
       return get().user;    
        
    },
    setActiveUser: (u) => 
        set({user: u}),
    logout: () => 
        set({user: undefined}),
  }))

  