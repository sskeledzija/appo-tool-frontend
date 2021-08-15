import axios from 'axios';
import create from 'zustand'
import _ from 'lodash';

type SubscriptionStore = {
    subscriptions: any[];
    isLoaded: boolean;
    isSubscribed: (entity) => boolean;
    setSubscriptions: (subscriptions) => void;
    getSubscriptions: (user) => any;
    reloadSubscriptions: (user) => void;
    addSubscription: (user, subscription) => void
    removeSubscription: (user, subscription) => void
  };

export const useSubscriptionWorkshop = create<SubscriptionStore>((set, get) => ({
    subscriptions: [],
    isLoaded: false,
    isSubscribed: (entityId) => {
      return _.find(get().subscriptions, {'entity': {'id': entityId}}) !== undefined
    },

    setSubscriptions: ([subs]) => 
        set({subscriptions: subs}),

    getSubscriptions: async (user) => {
      if (!get().isLoaded) {
        const response = await axios('http://localhost:9999/users/' + user['id'] + '/subscriptions');
        set({subscriptions: response.data, isLoaded: true})
      }
      return get().subscriptions
    },

    reloadSubscriptions: async (user) => {
      
      const response = await axios('http://localhost:9999/users/' + user['id'] + '/subscriptions');
      set({subscriptions: response.data})
      
      return get().subscriptions
    },

    addSubscription: async (user, subscription) => {
      axios.post('http://localhost:9999/users/' + user['id'] + '/subscriptions/' + subscription['id'],
      {
        bookerId: user['id'],
        comment: 'suchessssss'}
        ).then( response =>
          set({subscriptions: [...get().subscriptions, response.data]})
        ).catch(e => 
          console.log("Subscription cannot be added: " +  e.response )
          
        )
    },

    removeSubscription: async (user, subscription) => {
      const axiosDeleteInstance = axios.create({
        validateStatus: function (status) {
            return status == 410;
        },
      });
      axiosDeleteInstance.delete('http://localhost:9999/users/' + user['id'] + '/subscriptions/' + subscription['id']
        ).then( response =>
          get().reloadSubscriptions(user)
        ).catch(e => 
          console.log("Cannot remove subscription: " +  JSON.stringify(e.response) )
          
        )

  }}));

  