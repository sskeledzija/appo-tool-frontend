
import axios from 'axios';
import create from 'zustand'

type EntityOptionsStore = {
    activityAreas: [];
    organizationTypes: [];
    isLoaded: boolean,
    lazyLoadEntityOptions: (user) => void;
    getActivityAreas: (user) => any;
    getOrganizationTypes: (user) => any;
    
  };

export const useEntityOptionsWorkshop = create<EntityOptionsStore>((set, get) => ({
    activityAreas: [],
    organizationTypes: [],
    isLoaded: false,
    lazyLoadEntityOptions: (user) => {
        if(!get().isLoaded) {
            get().getActivityAreas(user);
            get().getOrganizationTypes(user);
        }

        set({...get(), isLoaded: true})
    },
    getActivityAreas: async (user) => { //todo there will be general and user defined types
        const response = await axios.get('http://localhost:9999/user-entities/activity-areas').catch(
                e => {
                    console.error("Activity areas could not be loaded: " + e, 3)
                    return null
                }
            );
       
        get().activityAreas = response?.data;
        
       if (response !== null) {
        console.log(`Activity areas successfully loaded (${get().activityAreas.length})`);
       }
       return get().activityAreas;
        
    },
    getOrganizationTypes: async (user) => {
        //todo there will be general and user defined types
        const response = await axios.get('http://localhost:9999/user-entities/organization-types').catch(
            e => {
                console.error("Organization types could not be loaded: " + e, 3)
                return null
            }
        );

        get().organizationTypes = response?.data;

        if (response !== null) {
            console.log(`Organizational types successfully loaded (${get().organizationTypes.length})`);
            
        }
        return get().organizationTypes;
    }

  }))

  