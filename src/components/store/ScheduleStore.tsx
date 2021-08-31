
import axios from 'axios';
import create from 'zustand'
import { message } from 'antd';

type ScheduleStore = {
    templates: [];
    workingDays: [];
    isLoaded: boolean,
    loadTemplates: (user) => void;
    createTemplate(entityId, template)
    // getWorkingDays: (user, start, end) => any;
    // createWorkingDays: (user) => any;
    // updateWorkingDay: (user, day) => void;
    // deleteWorkingDays: (user, days: []) => void;
    
  };

export const useScheduleWorkshop = create<ScheduleStore>((set, get) => ({
    templates: [],
    workingDays: [],
    isLoaded: false,
    loadTemplates: async (entityid) => {
        const response = await axios.get(`http://localhost:9999/user-entities/${entityid}/shift-templates`)
            .catch(
                e => {
                    console.error("Shift templates could not be loaded: " + e, 3)
                    return null
                }
            );
       
        //get().templates = response?.data;
        set({...get(), templates: response?.data})
        
       if (response !== null) {
        console.log(`Shift templates successfully loaded (${get().templates.length})`);
       }
       return get().templates;

    },
    createTemplate: async (entityId, tempalte) => { //todo there will be general and user defined types
        const response = await axios.post(`http://localhost:9999/user-entities/${entityId}/shift-templates`, tempalte)
        .catch(
                e => {
                    console.error("Template could not be created: " + e, 3)
                    message.error(`UPS! Something went wrong with entity creation: ${e}`, 3)
                    return null
                }
            );
       
       if (response !== null) {
            console.log(`template succesfully created (${response.data})`);
            message.success(`You have succesffuly created  " ${response.data['name']} "! `, 3)
       }
       
       get().loadTemplates(entityId)

       return response?.data;
        
    }

  }))

  