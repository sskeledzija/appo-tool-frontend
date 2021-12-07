import axios from 'axios';
import create from 'zustand'
import _  from 'lodash';
import { message } from 'antd';

type EntityStore = {
    entities: any[];
    createEntity: (userEntity) => any
    getUserEntities: (user) => any,
    getEntity: (id) => any;
    loadEntity: (id) => any;
  };

export const useEntityWorkshop = create<EntityStore>((set, get) => ({
    entities: [],
    
    createEntity: async (userEntity) => {
      const response = await axios.post('http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/user-entities', 
          {...userEntity}).catch(
              e => {
                  message.error(`UPS! Something went wrong with entity creation: ${e}`, 3)
                  return null
              }
          );
     
          // reload entities 
        get().getUserEntities(response?.data['user']['id']);
        
      if (response !== null) {
          message.success(`You have succesffuly created  " ${response.data['name']} "! `, 3)
      }
      return response?.data;
      
  },
    getUserEntities: async (userId) => {
      const entities = await axios.get('http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/user-entities/user/' + userId)
      if (entities.status != 200) {
          console.log("Could not get User Entities: " + entities.statusText);
          return   
      }
      set({entities: entities.data})
      console.log("###### " + JSON.stringify(get().entities));
      
      return get().entities;
  },
    getEntity: async (id) => 
        {
           let entity = _.find(get().entities, {'id': id})
           if (entity === undefined || entity === null) {
                entity = await get().loadEntity(id);
           }
           return entity
        },

        loadEntity: async (id) => {
            const entity = await axios.get('http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/user-entities/' + id)
            if (entity.status != 200) {
                console.log("Could not get User Entity: " + entity.statusText);
                return   
            }
            set({entities: [...get().entities, entity.data]})
            return entity.data;
    }

  }))

  
  