import axios from 'axios';
import create from 'zustand'
import _  from 'lodash';

type EntityStore = {
    entities: any[];
    getEntity: (id) => any;
    loadEntity: (id) => any;
  };

export const useEntityWorkshop = create<EntityStore>((set, get) => ({
    entities: [],
    
    getEntity: async (id) => 
        {
           let entity = _.find(get().entities, {'id': id})
           if (entity === undefined || entity === null) {
                entity = await get().loadEntity(id);
           }
           return entity
        },

        loadEntity: async (id) => {
            const entity = await axios.get('http://localhost:9999/user-entities/' + id)
            if (entity.status != 200) {
                console.log("Could not get User Entity: " + entity.statusText);
                return   
            }
            set({entities: [...get().entities, entity.data]})
            return entity.data;
    }

  }))

  
  